"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { socket } from "@/socket";

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
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (session.status == "unauthenticated") {
      router.push("/");
    } else if (session.status == "authenticated") {
      console.log("a");

      socket.on("connection", () => console.log("connect"));
      socket.on("disconnect", () => console.log("disconnect"));
    } else {
      console.log("loading");
    }

    return () => {
      socket.off("connection", () => console.log("connection"));
      socket.off("disconnect", () => console.log("disconnect"));
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
