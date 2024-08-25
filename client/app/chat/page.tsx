"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
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

  // const {} = useInfiniteQuery({
  //   queryKey: ["chat_data"],
  //   queryFn: getChatData,
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  // });

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
    <div className="overflow-hidden">
      <Navbar className="bg-primary-100">
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <p>{session.data?.user?.name}さん ようこそ</p>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div>
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
      <div className="bottom-0 fixed bg-white w-full p-4">
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
