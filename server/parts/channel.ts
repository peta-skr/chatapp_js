import { Channel } from "@prisma/client";
import { prisma } from "./index";
import { v4 as uuidv4 } from "uuid";
/**
 * channel.ts内の関数の戻り値
 */
class ChannelReturn {
  result: boolean;
  channel: Channel | null;
  errorMessage: string | null;

  constructor(
    result: boolean,
    channel: Channel | null,
    errorMessage: string | null
  ) {
    this.result = result;
    this.channel = channel;
    this.errorMessage = errorMessage;
  }
}
async function create_channel(channel_name: string): Promise<ChannelReturn> {
  const channel = await prisma.channel.create({
    data: {
      id: uuidv4(),
      channel_name: channel_name,
    },
  });

  if (channel) {
    return new ChannelReturn(true, channel, null);
  } else {
    return new ChannelReturn(true, null, "チャンネルの作成に失敗しました。");
  }
}

async function invite_channel() {}

async function join_channel() {}

async function leave_channel() {}
