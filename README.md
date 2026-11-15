# chatapp_js

Next.js（クライアント）とExpress + socket.io（サーバ）、PostgreSQL（Prisma）で作り始めたチャットアプリ。開発途中で止まっている。`memo.md` に書いた要件（ユーザー名で参加、WebSocketで全員にメッセージを表示、DBへの保存、チャンネル、個別チャットなど）は [app-ideas](https://github.com/florinpop17/app-ideas) のChat Appの課題とほぼ同じ内容。

同じ題材の [chat_app_simple](https://github.com/peta-skr/chat_app_simple) は、このリポジトリの最後のコミット（2024-10-01）のあとに、範囲を「名前を入れて1つの部屋で話すだけ」に絞って始めたもの。chatapp_jsのほうはユーザー・チャンネル・チャンネル参加・メッセージの4テーブルを持ち、認証の作り替えや過去ログの分割読み込みまで手を付けている。

コミット履歴から分かる開発の経過は次のとおり。

- 2024年8月〜9月中旬: NextAuth（Credentials）でログインし、socket.ioでメッセージを全員に配信する形で作った。過去のメッセージはサーバの `GET /message/get` から10件ずつ取り、画面の上端までスクロールすると、TanStack Queryの `useInfiniteQuery` で次の10件を読み込む
- 2024年9月下旬から: 認証をFirebase Authentication（メールアドレスとパスワード）に移している途中。新規登録とログインはFirebaseで行い、Firebaseのuidとユーザー名をExpress経由でPostgreSQLに保存する
- 現在のコードでは、チャット画面（`client/app/chat/page.tsx`）と、サーバのsocket.ioの処理・メッセージ取得APIがコメントアウトされている。残っているのは新規登録とログインの画面とAPIだけ

## 動かし方

`package.json` の scripts から確認したコマンド。PostgreSQLとFirebaseのプロジェクトが必要。

```sh
# サーバ（:4000）
cd server
npm install
npx prisma migrate dev
npm run dev

# クライアント（:3000）
cd client
npm install
npm run dev
```

必要な環境変数（値は各自の環境のもの）

- `server/.env`: `DATABASE_URL`
- `client/.env`: `NEXT_PUBLIC_API_KEY` `NEXT_PUBLIC_AUTH_DOMAIN` `NEXT_PUBLIC_PROJECT_ID` `NEXT_PUBLIC_STORAGE_BUCKET` `NEXT_PUBLIC_MESSAGING_SENDER_ID` `NEXT_PUBLIC_APP_ID`（Firebaseの設定値）

現在のクライアントは、`package.json` から外した `next-auth` をまだ import しているため、このままでは起動しない。

## 使った技術

- クライアント: Next.js 14（App Router）、TypeScript、NextUI、Tailwind CSS、TanStack Query、axios、socket.io-client、Firebase Authentication
- サーバ: Express、socket.io、Prisma、PostgreSQL、ts-node、nodemon

## 学んだこと

- socket.ioでサーバに届いたメッセージをDBに保存し、接続中の全クライアントへ配信する流れ
- `useInfiniteQuery` とページ番号で、チャットの過去ログを上方向に追加で読み込む方法
- Prismaのスキーマとマイグレーションで、ユーザーとチャンネルの多対多（参加テーブル）を表す方法
