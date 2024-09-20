"use client";

import { io, Socket } from "socket.io-client";

let socket: Socket | null;

export const connectSocket = (token: string) => {
  if (!socket) {
    socket = io(process.env.WSURL || "http://localhost:8989", {
      autoConnect: false,
      withCredentials: true,
      path: "/socket.io/",
      auth: {
        token,
      },
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
