"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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

function send_message(socket: any, event: any) {
  socket.emit("chat message", "hey");
}

const ChatPage = () => {
  const session = useSession();
  const router = useRouter();

  let socket: any;

  useEffect(() => {
    if (session.status == "unauthenticated") {
      router.push("/");
    } else if (session.status == "authenticated") {
      socket = socket_connect();
    }
  }, [session]);

  return (
    <div>
      <h1>ログイン成功</h1>
      <p>ログインに成功しました！</p>
      <p>{session.data?.user?.name}さん ようこそ</p>
      <form onClick={(e) => send_message(socket, e)}>
        <input type="text" />
        <button>send</button>
      </form>
    </div>
  );
};

export default ChatPage;
