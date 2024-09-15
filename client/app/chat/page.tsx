"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { socket } from "@/socket";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Input } from "@nextui-org/react";
import Header from "@/components/Header";
import ChatCard from "@/components/ChatCard";
import SideBar from "@/components/SideBar";

const ChatPage = () => {
  function send_message() {
    if (text.length > 0) {
      socket.emit("chat message", {
        user: session.data?.user?.name,
        text: text,
      });
      setText("");
    }
  }

  async function getChatData({ pageParam }: any) {
    const res = await axios.get(
      "http://localhost:4000/message/get?pageParam=" + pageParam
    );
    return res;
  }

  const session = useSession();
  const router = useRouter();

  const [text, setText] = useState("");
  const [messages, SetMessages]: any = useState([]);
  const [height, setHeight] = useState(0);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["chat_data"],
    queryFn: getChatData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.data.nextPage,
    enabled: socket.connected,
  });

  useEffect(() => {
    if (data) {
      console.log(data);

      SetMessages([
        ...data?.pages[data.pages.length - 1].data.chat_data.chat,
        ...messages,
      ]);
    }
  }, [data]);

  /*
   *
   * ログイン確認
   *
   */
  if (session.status == "unauthenticated") {
    router.push("/");
  } else if (session.status == "authenticated") {
    socket.connect();

    // socket.on("chat message", (msg) => console.log(msg));
    socket.on("add message", (msg) => {
      SetMessages([...messages, msg]);
    });
  }

  const scrollBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("gg");

    if (data?.pageParams.length == 0) {
      window.scrollTo(0, document.body.clientHeight);
      setHeight(document.body.clientHeight);
    } else {
      window.scrollTo(0, document.body.clientHeight - height + window.scrollY);
      setHeight(document.body.clientHeight);
    }
  }, [messages]);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY == 0) {
        fetchNextPage();
      }
    });
  }, [status]);

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error</p>
  ) : (
    <div className="h-screen">
      <Header session={session} />
      <div className="bg-teal-200 h-[84%] flex">
        <SideBar />
        <div className="w-4/5 h-full bg-teal-300">
          {messages.map((msg: any) => {
            let date = new Date(msg.create_date).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            });
            return <ChatCard msg={msg} date={date} />;
          })}
        </div>
      </div>
      <div ref={scrollBottomRef}></div>
      <div className="sticky bottom-0 bg-red-100 w-full p-4 z-50 h-[8%]">
        <div className="flex w-full flex-wrap md:flex-nowrap">
          <Input
            placeholder="text"
            variant="bordered"
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <Button onClick={() => send_message()} color="success">
            send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
