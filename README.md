# タスク管理アプリ


## デモ

[タスク管理アプリ](https://task-management-application-sable.vercel.app/)
上記のリンクからデプロイされたアプリをお試しいただけます：


画面右上の「ゲストログイン」ボタンを押下することでゲストユーザーとしてログインできます。
![image](https://github.com/user-attachments/assets/2ed71cb3-ddeb-44fd-9975-fe31fdedd00f)




## 概要
このアプリはタスク管理を効率化するためのWebアプリケーションです。
カテゴリごとにタスクを管理でき、緊急度や状態のアイコン表示、タスクの並び替え、編集や削除の機能を備えています。
また、保有しているタスクはグラフで進捗状況を可視化できるようにしています。(スマートフォンサイズでは表示の問題で非表示になります。)


![スクリーンショット](./images/project-screenshot.png)
![スクリーンショット](./images/project-screenshot2.png)
![スクリーンショット](./images/project-screenshot3.png)


## 今後追加検討の機能
- ユーザーの友達追加機能
- 友達になったユーザーとのタスクやカテゴリの共有
- リマインダーを行ったりカレンダーで日付ごとにタスクを可視化できる機能

## 使用技術
- **Next.js**
- **TypeScript**
- **Prisma**:(ORM)
- **Supabase**:(データベース)
- **react-hook-form**:(フォーム管理)
- **zod**:(フォームバリデーション)
- **react-chartjs-2**:(円グラフ)
- **Tailwind CSS**:(css)
- **shadcn/ui**:(UIコンポーネント)
- **Clerk**: (ユーザー認証機能)






## テーブルのモデル
```mermaid
erDiagram
    User ||--o{ Task : "has"
    User ||--o{ Category : "has"
    Category ||--o{ Task : "contains"

    User {
        string id PK "cuid"
        string userId UK "Clerk userId"
        datetime createdAt
        datetime updatedAt
        string name
        string img
    }

    Task {
        string id PK "cuid"
        datetime createdAt
        datetime updatedAt
        string title
        string emergency
        string status
        string description
        string userId FK
        string categoryId FK
    }

    Category {
        string id PK "cuid"
        string name
        string userId FK
    }



