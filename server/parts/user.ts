import { User } from "@prisma/client";
import { prisma } from "./index";
import { v4 as uuidv4 } from "uuid";

/**
 * user.ts内の関数の戻り値
 */
class UserReturn {
  result: boolean;
  user: User | null;
  errorMessage: string | null;

  constructor(result: boolean, user: User | null, errorMessage: string | null) {
    this.result = result;
    this.user = user;
    this.errorMessage = errorMessage;
  }
}

async function signup(name: string, password: string): Promise<UserReturn> {
  // 同じ名前をユーザがいるかチェック
  const same_user = await prisma.user.findUnique({
    where: {
      name: name,
    },
  });

  console.log(same_user);

  if (same_user) {
    return new UserReturn(false, null, "この名前は既に使用されています。");
  }

  const user = await prisma.user.create({
    data: {
      id: uuidv4(),
      name: name,
      password: password,
    },
  });

  if (user) {
    return new UserReturn(true, user, null);
  } else {
    return new UserReturn(false, null, "ユーザーの作成に失敗しました。");
  }
}

async function login(name: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      name: name,
    },
  });

  // ユーザがないとき
  if (!user) {
    return false;
  }

  // パスワードチェック
  if (user.password === password) {
    return true;
  } else {
    return false;
  }
}

export { signup, login };
