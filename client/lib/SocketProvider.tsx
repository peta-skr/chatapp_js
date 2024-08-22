"use client";

import { socket } from "@/socket";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  const session = useSession();

  if (session.status == "authenticated") {
    socket.connect();
  }

  return (
    <>
      {children}
      <p>socket : {isConnected}</p>
    </>
  );
};
