"use client";

import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";

const page = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function signUp() {
    const res = await axios.post(
      "http://localhost:4000/signup",
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

    console.log(res);
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Input value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={() => signUp()}>Sign Up</Button>
    </div>
  );
};

export default page;
