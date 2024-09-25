import { Socket } from "socket.io-client";

export function bindEvents(socket: Socket) {
  socket.onAny((event, ...args) => {
    console.log("incoming", event, args);
  });

  socket.onAnyOutgoing((event, ...args) => {
    console.log("outgoing", event, args);
  });
}
