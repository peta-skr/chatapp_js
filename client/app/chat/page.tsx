"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { socket } from "@/socket";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const ChatPage = () => {
  function send_message(event: any) {
    event.preventDefault();
    if (text.length > 0) {
      socket.emit("chat message", {
        user: session.data?.user?.name,
        text: text,
      });
      setText("");
    }
  }

  async function getChatData() {}

  const session = useSession();
  const router = useRouter();

  const [text, setText] = useState("");
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, SetMessages]: any = useState([]);
  async function test() {
    let res = await axios.get("http://localhost:4000/message/get?pageParam=1");
    console.log(res);
  }

  const {} = useInfiniteQuery({
    queryKey: ["chat_data"],
    queryFn: getChatData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  useEffect(() => {
    function onConnect() {
      console.log("connect");

      // setIsConnected(true);

      socket.emit("select all");
    }

    function onDisconnect() {
      console.log("disconnect");

      // setIsConnected(false);
    }

    if (session.status == "unauthenticated") {
      router.push("/");
    } else if (session.status == "authenticated") {
      socket.connect();

      socket.on("connect", () => onConnect());
      socket.on("disconnect", onDisconnect);
      socket.on("send all message", (all_message) => SetMessages(all_message));
      socket.on("chat message", (msg) => console.log(msg));
      socket.on("add message", (msg) => SetMessages([...messages, msg]));
    } else {
      console.log("loading");
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [session]);

  return (
    <div>
      <h1>ログイン成功</h1>
      <p>ログインに成功しました！</p>
      <p>{session.data?.user?.name}さん ようこそ</p>
      <form onClick={(e) => send_message(e)}>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button>send</button>
      </form>
      <div>
        {messages.map((msg: any) => {
          return (
            <div key={msg.id}>
              <p>{msg.user_name}</p>
              <p>{msg.create_date}</p>
              <p>{msg.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatPage;
