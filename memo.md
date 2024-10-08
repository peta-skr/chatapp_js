# chat app

## 基本機能

- ユーザー名を入力 → ユーザ名はアプリに保存される
- 会話ができる

## ボーナス

- すべてのユーザにメッセージが表示される(websocket)
- 新しいユーザがチャットに参加すると、既存のすべてのユーザにメッセージが表示される
- メッセージはデータベースに保存される
- 画像、動画、リンクを送信可能
- 絵文字の送信も可能
- プライベートチャットや特定のチャンネルの作成、参加が可能

## 使用技術

- Next.js
- node.js(いつか go とか java で書き換えたい)
- postgreSQL

## まず作成する部分

- ユーザ名だけのログイン機能
- チャットのグループは全員が入っているグループのみ
- 文字のみの送信

## 作成時のメモ

socket.io を使用
login→ チャット画面に遷移する
つまり、socket.io で接続するのはチャット側

# ToDo

- ユーザリストを横に作成したい。
- チャンネルを作成する機能
- ユーザリストの上に参加しているチャンネルリストを作成したい。
- チャンネルにユーザを加える機能
