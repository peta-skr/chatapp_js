import express from "express";
import type {Express, Request, Response} from "express";
import {PrismaClient} from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.get("/", (req: Request, res: Response) => {
    res.send({
        msg:'GET request'
      });
})

// ログイン
app.post("/login", (req, res) => {
    // reqでユーザ名が与えられる（いったん、パスワードとかは考えずに書く）


    // DB内に同一のユーザ名があれば、ログイン

    // なければ、新しく作成する
})

// メッセージの送信

app.post("/message/send", (req, res) => {
    // reqで送信するメッセージが来る

    // DBにメッセージを格納し、全ユーザに表示
})

// 受信
app.get("/message/get", (req, res) => {
    // 送信が起こったタイミングで走る
})

app.listen(3000, () => {
    console.log("server started on port 3000");
    
});