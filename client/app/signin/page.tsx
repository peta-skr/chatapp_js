"use client";

import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  async function login() {
    // 入力チェック
    if (email == "" || password == "") {
      setErrMsg("必要事項を記入してください。");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);

        const res = await axios.post(
          "http://localhost:4000/login",
          {
            uid: user.uid,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        let data = res.data;

        if (data.result === false) {
          // ログインに失敗したときの処理
          setErrMsg(data.errorMessage);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setErrMsg(`${errorCode} : ${errorMessage}`);
      });
  }

  return (
    <div className="h-svh flex justify-center flex-col items-center gap-5">
      <h1>Login</h1>
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
      <>{errMsg}</>
      <Button size="lg" color="primary" onClick={() => login()}>
        ログイン
      </Button>
    </div>
  );
};

export default page;
