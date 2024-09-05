import { prisma } from "./index";
import { v4 as uuidv4 } from "uuid";

async function signup(name: string, password: string) {
  const user = await prisma.user.create({
    data: {
      id: uuidv4(),
      name: name,
      password: password,
    },
  });

  console.log(user);

  if (user) {
    return true;
  } else {
    return false;
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
