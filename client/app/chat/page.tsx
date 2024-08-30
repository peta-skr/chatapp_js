"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { socket } from "@/socket";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Button,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";

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
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.data.nextPage,
  });

  console.log(data);

  // ログイン済みか確認
  useEffect(() => {
    if (session.status == "unauthenticated") {
      router.push("/");
    } else if (session.status == "authenticated") {
      socket.connect();
      console.log(socket);

      socket.on("chat message", (msg) => console.log(msg));
      socket.on("add message", (msg) => SetMessages([...messages, msg]));
    }
  }, [session]);

  useEffect(() => {
    if (data) {
      SetMessages([
        ...data?.pages[data.pages.length - 1].data.chat_data,
        ...messages,
      ]);
      console.log(document.body.clientHeight);
    }
  }, [data]);

  const scrollBottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (data?.pageParams.length == 1) {
      // scrollBottomRef?.current?.scrollIntoView();
      window.scrollTo(0, document.body.clientHeight);
      setHeight(document.body.clientHeight);
    } else {
      window.scrollTo(0, document.body.clientHeight - height);
      setHeight(document.body.clientHeight);
    }
  }, [data]);

  useLayoutEffect(() => {
    console.log("gg");

    window.scrollTo(0, document.body.clientHeight);
    // if (data?.pageParams.length == 1) {
    //   // scrollBottomRef?.current?.scrollIntoView();
    //   setHeight(document.body.clientHeight);
    // } else {
    //   window.scrollTo(0, document.body.clientHeight - height);
    //   setHeight(document.body.clientHeight);
    // }
  }, [messages]);

  // useEffect(() => {
  //   if (height != 0) {
  //     window.scrollTo(0, document.body.clientHeight - height);
  //   }
  //   setHeight(document.body.clientHeight);
  // }, [document.body.clientHeight]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(containerRef.current);

    document.addEventListener("scroll", () => {
      if (window.scrollY == 0) {
        // fetchNextPage();
      }
    });
  }, [status]);

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error</p>
  ) : (
    <div>
      <Navbar className="bg-primary-100">
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <p>{session.data?.user?.name}さん ようこそ</p>
            <button onClick={() => fetchNextPage()}>ad</button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div ref={containerRef}>
        {messages.map((msg: any) => {
          let date = new Date(msg.create_date).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <Card key={msg.id} className="my-2 p-3">
              <CardHeader className="flex gap-4">
                <p>{msg.user_name}</p>
                <p>{date}</p>
              </CardHeader>
              <CardBody>
                <p>{msg.text}</p>
              </CardBody>
            </Card>
          );
        })}
      </div>
      <div ref={scrollBottomRef}></div>
      {/* <div className="bottom-0 fixed bg-white w-full p-4"> */}
      <div className="sticky bottom-0 bg-white w-full p-4 z-50">
        <form onClick={(e) => send_message(e)}>
          <div className="flex w-full flex-wrap md:flex-nowrap">
            <Input
              placeholder="text"
              variant="bordered"
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <Button color="success">send</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
