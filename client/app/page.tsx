"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {io} from "socket.io-client";

export default function Home() {


  function socket_connect() {

    const socket = io("http://localhost:4000", {path: "/socket/"});
    
    socket.on("connect", () => {
      if (socket.connected) {
        console.log(`client connected on port 4000`);
      }
    })
  }

  const [name, setName] = useState("");
  const router = useRouter();

  function changeName(event: any) {
    setName(event.target.value);
  }

  async function login(event: any) {

    event.preventDefault();

    try {
      let res = await axios.post("http://localhost:4000/login", {
        name: name
      }, {headers: {
         'Content-Type': 'multipart/form-data'
      }})

      console.log(res);
      socket_connect();
      router.push("/success");
      
    }catch(err) {
      console.log(err);
      
    }
  }

  return (
    <main>
    <h1>login</h1>
      <form>
        <input type="text" className="username" onChange={(e) => changeName(e)} />
        <button type="submit" onClick={(e) => login(e)}>login</button>
      </form>
    </main>
  );
}
