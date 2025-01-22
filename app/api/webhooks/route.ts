import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local');
  }

  const wh = new Webhook(SIGNING_SECRET);
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', { status: 400 });
  }

  const payload = await req.json();
  let evt: WebhookEvent;
  const body = JSON.stringify(payload)


  try {
    evt = wh.verify(JSON.stringify(payload), {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error: Could not verify webhook:', (err as Error).message);
    return new Response('Error: Verification error', { status: 400 });
  }

  if (evt.type === 'user.created') {
    try {
      // トランザクションを使用して、ユーザーとカテゴリの作成を原子的に行う
      await prisma.$transaction(async (tx) => {
        // ユーザーを作成
        await tx.user.create({
          data: {
            userId: evt.data.id,
            name: JSON.parse(body).data.username,
            img: JSON.parse(body).data.image_url,
          },
        });

        // カテゴリを作成
        await tx.category.create({
          data: {
            name: 'all',  // 初期カテゴリとして'all'を設定
            userId: evt.data.id,
          },
        });
      });

      return new Response('User and category created successfully', { status: 201 });
    } catch (err) {
      console.error('Error inserting user or category into database:', err);
      return new Response('Error: Database operation failed', { status: 500 });
    }
  }

  if (evt.type === 'user.updated') {
    try {
      await prisma.user.update({
        where: { userId: evt.data.id },
        data: {
          name: JSON.parse(body).data.username,
          img: JSON.parse(body).data.image_url,
        },
      });

      return new Response('User updated successfully', { status: 200 });
    } catch (err) {
      console.error('Error updating user:', err);
      return new Response('Error: Database operation failed', { status: 500 });
    }
  }

  return new Response('Webhook received', { status: 200 });
}