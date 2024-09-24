"use client";

import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "@/lib/firebase";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // const auth = getAuth();

  async function signUp() {
    // 入力チェック
    if (email == "" || password == "" || checkPassword == "") {
      setErrMsg("必要事項を記入してください。");
      return;
    }

    // パスワードと確認用パスワードが同じかをチェック
    if (password !== checkPassword) {
      setErrMsg("パスワードと確認用パスワードが一致しません。");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errCode = error.code;
        const errMessage = error.message;

        console.log(errCode);
        console.log(errMessage);
      });

    // const res = await axios.post(
    //   "http://localhost:4000/signup",
    //   {
    //     name: name,
    //     password: password,
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    // );

    // let data = res.data;

    // if (data.result === true) {
    //   // auth.jsのサインインメソッドを実行している
    //   // https://next-auth.js.org/getting-started/client#starts-oauth-sign-in-flow-when-clicked
    //   await signIn("credentials", { name, password, callbackUrl: "/chat" });
    // } else {
    //   // 新規登録に失敗したときの処理
    //   setErrMsg(data.errorMessage);
    // }
  }

  return (
    <div className="h-svh flex justify-center flex-col items-center gap-5">
      <h1>Sign Up</h1>
      <Input
        className="w-2/3"
        label="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        className="w-2/3"
        label="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        className="w-2/3"
        label="確認用パスワード"
        value={checkPassword}
        onChange={(e) => setCheckPassword(e.target.value)}
      />
      <>{errMsg}</>
      <Button size="lg" color="primary" onClick={() => signUp()}>
        新規登録
      </Button>
    </div>
  );
};

export default page;
