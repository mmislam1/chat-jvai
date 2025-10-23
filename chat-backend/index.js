
import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.send("Server is running"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(console.error);

io.on("connection", (socket) => {
  console.log("⚡ user connected:", socket.id);
  socket.on("disconnect", () =>
    console.log("❌ user disconnected:", socket.id)
  );
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`🚀 Server started on port ${process.env.PORT || 5000}`)
);
