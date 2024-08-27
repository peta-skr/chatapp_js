import express from "express";
import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser, { BodyParser } from "body-parser";
import formData from "express-form-data";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { log } from "console";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  formData.parse({ uploadDir: path.join(__dirname, "tmp"), autoClean: true })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  path: "/socket/",
  cors: { origin: "http://localhost:3000" },
});

const prisma = new PrismaClient();

app.get("/", async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      id: "test",
      name: "test",
    },
  });

  res.send({
    user: user,
  });
});

// ログイン
app.post("/login", async (req: Request, res: Response) => {
  // reqでユーザ名が与えられる（いったん、パスワードとかは考えずに書く）
  let name = req.body.name;

  // DB内に同一のユーザ名があれば、ログイン
  const user = await prisma.user.findUnique({
    where: {
      name: name,
    },
  });

  // なければ、新しく作成する
  if (!user) {
    const new_user = await prisma.user.create({
      data: {
        // id: uuidv4(),
        id: name,
        name: name,
      },
    });

    res.send(new_user);
  } else {
    res.send(user);
  }
});

// メッセージの送信

app.post("/message/send", (req, res) => {
  // reqで送信するメッセージが来る
  // DBにメッセージを格納し、全ユーザに表示
});

// 受信
app.get("/message/get", async (req, res) => {
  let pageParam = String(req.query.pageParam);
  let chat_data = await get_chat_data(pageParam);

  let nextPage = chat_data == false ? null : Number(pageParam) + 1;

  res.send({ chat_data: chat_data, nextPage: nextPage });
});

async function add_message(username: any, text: any) {
  const user = await prisma.user.findUnique({
    where: {
      name: username,
    },
  });

  if (user) {
    const message = await prisma.chat.create({
      data: {
        id: uuidv4(),
        user: {
          connect: {
            id: user.id,
          },
        },
        text: text,
      },
    });
    console.log(message);

    return message;
  }

  return null;
}

async function get_chat_data(pageParam: string) {
  const chat_data = await prisma.chat.findMany({
    take: 10,
    skip: Number(pageParam) * 10,
    orderBy: {
      create_date: "desc",
    },
  });

  if (chat_data) {
    return chat_data.reverse();
  } else {
    return false;
  }
}

io.on("connection", (socket) => {
  console.log("socket");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", async (msg) => {
    let new_msg: any = await add_message(msg.user, msg.text);

    if (new_msg) {
      // console.log(new_msg);

      io.emit("add message", new_msg);
    }
  });

  socket.on("select all", async () => {
    const all_message = await prisma.chat.findMany();

    socket.emit("send all message", all_message);
  });
});

httpServer.listen(4000, () => {
  console.log("server started on port 4000");
});
