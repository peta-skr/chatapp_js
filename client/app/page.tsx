"use client";

import { useState } from "react";
import {io} from "socket.io-client";

export default function Home() {

  const socket = io("http://localhost:4000", {path: "/socket/"});

  socket.on("connect", () => {
    if (socket.connected) {
      // config.tsからportを参照
      console.log(`client connected on port 4000`);
    }
  })

  const [name, setName] = useState("");

  function changeName(event: any) {
    setName(event.target.value);
  }

  function login() {
    
  }

  return (
    <main>
    <h1>login</h1>
      <form>
        <input type="text" className="username" onChange={(e) => changeName(e)} />
        <button type="submit" onClick={() => login()}>login</button>
      </form>
    </main>
  );
}
