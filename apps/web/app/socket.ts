"use client";

import { io } from "socket.io-client";

export const socket = io(process.env.WSURL || "http://localhost:8989", {
  autoConnect: false,
});
