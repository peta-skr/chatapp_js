import { Chat } from "@prisma/client";
import { prisma } from "./index";
import { v4 as uuidv4 } from "uuid";

/**
 * chat.ts内の関数の戻り値
 */
class ChatReturn {
  result: boolean;
  chat: Chat | null;
  errorMessage: string | null;

  constructor(result: boolean, chat: Chat | null, errorMessage: string | null) {
    this.result = result;
    this.chat = chat;
    this.errorMessage = errorMessage;
  }
}

class ChatListReturn {
  result: boolean;
  chat: Chat[] | null;
  errorMessage: string | null;

  constructor(
    result: boolean,
    chat: Chat[] | null,
    errorMessage: string | null
  ) {
    this.result = result;
    this.chat = chat;
    this.errorMessage = errorMessage;
  }
}

// 該当チャンネル内のトークを10件取得する
async function get_chat_data(
  pageParam: string,
  channel_id: string
): Promise<ChatListReturn> {
  const chat_data = await prisma.chat.findMany({
    take: 10,
    skip: Number(pageParam) * 10,
    where: {
      channel_id: channel_id,
    },
    orderBy: {
      create_date: "desc",
    },
  });

  if (chat_data) {
    // トークのデータが1件以上取得できた場合は、下に一番新しいデータを表示するため、
    // リバースして渡す。
    return new ChatListReturn(true, chat_data.reverse(), null);
  } else {
    return new ChatListReturn(false, null, "取得したデータの件数が0件でした。");
  }
}

async function add_message(
  username: string,
  channel_id: string,
  text: string
): Promise<ChatReturn> {
  // 該当ユーザが存在するのか。
  const user = await prisma.user.findUnique({
    where: {
      name: username,
    },
  });

  if (!user) {
    return new ChatReturn(false, null, "該当ユーザは存在しません。");
  }

  // 該当チャンネルが存在するのか。
  const channel = await prisma.channel.findUnique({
    where: {
      id: channel_id,
    },
  });

  if (!channel) {
    return new ChatReturn(false, null, "該当チャンネルは存在しません。");
  }

  const message = await prisma.chat.create({
    data: {
      id: uuidv4(),
      user: {
        connect: {
          id: user.id,
        },
      },
      text: text,
      channel: {
        connect: {
          id: channel.id,
        },
      },
    },
  });
  console.log(message);

  return new ChatReturn(true, message, null);
}

function update_message() {}

function delete_message() {}

export { get_chat_data, add_message };
