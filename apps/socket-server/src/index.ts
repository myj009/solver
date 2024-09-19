import express from "express";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app = express();
app.use(bodyParser.json);

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));
const server = http.createServer(app);

const io = new Server(server, {
  cors: corsOptions,
});

app.get("/", (req, res) => {
  return res.send("Hellow");
});

initEventHandlers({ io });

server.listen(process.env.PORT || 8000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

function initEventHandlers({ io }: { io: Server }) {
  io.on("connection", (socket) => {
    console.log("user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}
