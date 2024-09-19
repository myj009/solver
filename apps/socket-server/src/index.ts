import express from "express";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  return res.send("Hellow");
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(process.env.PORT || 8000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
