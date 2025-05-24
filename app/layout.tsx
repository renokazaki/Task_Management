import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedOut } from "@clerk/nextjs";
import GuestLogin from "./GuestLogin";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management",
  description: "Task Management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/sign-in">
      <html lang="ja">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <main className="h-screen w-screen overflow-hidden">
            <div className="flex justify-end">
              <SignedOut>
                <GuestLogin />
              </SignedOut>
            </div>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
