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

class UserListReturn {
  result: boolean;
  user: User[] | null;
  errorMessage: string | null;

  constructor(
    result: boolean,
    user: User[] | null,
    errorMessage: string | null
  ) {
    this.result = result;
    this.user = user;
    this.errorMessage = errorMessage;
  }
}

async function signup(name: string, uid: string): Promise<UserReturn> {
  const user = await prisma.user.create({
    data: {
      id: uid,
      name: name,
    },
  });

  if (user) {
    return new UserReturn(true, user, null);
  } else {
    return new UserReturn(false, null, "ユーザーの作成に失敗しました。");
  }
}

async function login(uid: string): Promise<UserReturn> {
  const user = await prisma.user.findUnique({
    where: {
      id: uid,
    },
  });

  // ユーザがないとき
  if (!user) {
    return new UserReturn(false, null, "ログインに失敗しました。");
  }

  // パスワードチェック
  return new UserReturn(true, user, null);
}

// 自分以外のユーザを取得する
async function getUserListWithoutMe(id: string): Promise<UserListReturn> {
  const users = await prisma.user.findMany({
    where: {
      NOT: {
        id: id,
      },
    },
  });

  // ユーザがないとき
  if (!users) {
    return new UserListReturn(false, null, "ユーザの取得に失敗しました。");
  }

  return new UserListReturn(true, users, null);
}

export { signup, login, getUserListWithoutMe, UserReturn, UserListReturn };
