import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

const ChatCard = ({ msg, date }: any) => {
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
};

export default ChatCard;
