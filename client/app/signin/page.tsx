"use client";

import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

const page = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const res = await axios.post(
      "http://localhost:4000/login",
      {
        name: name,
        password: password,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    let data = res.data;

    if (data.result === true) {
      // auth.jsのサインインメソッドを実行している
      // https://next-auth.js.org/getting-started/client#starts-oauth-sign-in-flow-when-clicked
      await signIn("credentials", { name, password });
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Input value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={() => login()}>Sign Up</Button>
    </div>
  );
};

export default page;
