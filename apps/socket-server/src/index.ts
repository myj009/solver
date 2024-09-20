import dotenv from "dotenv";
import { createServer } from "./server";
import { reachUser } from "./user/reach";
import jwt from "jsonwebtoken";
import { JwtUser } from "./types/user";
import { Server } from "socket.io";
import { ISocket } from "./types/socket";

dotenv.config();

const io = createServer();

initEventHandlers({ io });

function initEventHandlers({ io }: { io: Server }) {
  io.use((socket, next) => {
    const sock = socket as ISocket;
    const token = sock.handshake.auth.token;
    try {
      const user = jwt.verify(
        token,
        process.env.JWT_TOKEN || "password"
      ) as JwtUser;
      sock.userId = user.userId;
      next();
    } catch (e) {
      console.error(e);
      const err = new Error("Not authorized: " + e);
      next(err);
    }
  });

  io.on("connection", (socket) => {
    const sock = socket as ISocket;
    console.log("user connected:", sock.userId);
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("user:reach", reachUser(socket));
  });
}
