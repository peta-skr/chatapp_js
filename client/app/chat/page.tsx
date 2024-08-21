"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function socket_connect() {
  const socket = io("http://localhost:4000", { path: "/socket/" });

  socket.on("connect", () => {
    if (socket.connected) {
      console.log(`client connected on port 4000`);
    }

    socket.on("chat message", (msg) => {
      console.log(msg);
    });
  });

  return socket;
}

function send_message(event: any, socket: any, text: any, session: any) {
  console.log(socket);

  event.preventDefault();
  if (text.length > 0) {
    console.log(text);

    socket.emit("chat message", {
      user: session.data?.user?.name,
      text: text,
    });
  }
}

const ChatPage = () => {
  const session = useSession();
  const router = useRouter();

  const [text, setText] = useState("");

  let socket: any;

  useEffect(() => {
    console.log(session.status);

    if (session.status == "unauthenticated") {
      router.push("/");
    } else if (session.status == "authenticated") {
      socket = socket_connect();
    }

    return () => {
      if (session.status == "authenticated") {
        socket.on("disconnect", () => {
          console.log("接続解除しました");
        });
      } else {
        console.log("clean up");
      }
    };
  }, [session]);

  return (
    <div>
      <h1>ログイン成功</h1>
      <p>ログインに成功しました！</p>
      <p>{session.data?.user?.name}さん ようこそ</p>
      <form onClick={(e) => send_message(e, socket, text, session)}>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button>send</button>
      </form>
    </div>
  );
};

export default ChatPage;
