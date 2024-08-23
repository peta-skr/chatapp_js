import { io } from "socket.io-client";

export const socket = io("http://localhost:4000", {
  path: "/socket/",
  autoConnect: false,
});

socket.on("connection", () => console.log("test"));

console.log(socket);
