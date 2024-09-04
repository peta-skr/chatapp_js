import { prisma } from "./index";
import { v4 as uuidv4 } from "uuid";

// 該当チャンネル内のトークを10件取得する
async function get_chat_data(pageParam: string, channel_id: string) {
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
    return chat_data.reverse();
  } else {
    return false;
  }
}

async function add_message(username: string, channel_id: string, text: string) {
  // 該当ユーザが存在するのか。
  const user = await prisma.user.findUnique({
    where: {
      name: username,
    },
  });

  // 該当チャンネルが存在するのか。
  const channel = await prisma.channel.findUnique({
    where: {
      id: channel_id,
    },
  });

  if (user && channel) {
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

    return message;
  }

  return null;
}

function update_message() {}

function delete_message() {}

export { get_chat_data, add_message };
