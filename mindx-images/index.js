require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PostRouter = require("./modules/post");
const AuthRouter = require("./modules/auth");
const CommentRouter = require("./modules/comment");
const UploadRouter = require("./modules/upload");
const log = require("./common/middlewares/log");
const errorHandle = require("./common/errorHandle");
const http = require("http");
const { Server } = require("socket.io");

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("MongoDB connected!");

  const app = express();
  app.use(cors());
  app.use(log);

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });
  // io.on("connection", (socket) => {
  //   console.log(`User Connected: ${socket.id}`);
  //   socket.on("send_message", (data) => {
  //     console.log("data tu clean gui ve", data)
  //     socket.emit("data",data)
  //   });
  // });
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("sendComment", (data) => {
      console.log("Comment cletm", data)
      socket.emit("data",data)
    });
  });

  app.use(express.json());

  app.use("/uploads", express.static("uploads"));

  app.use("/api/posts", PostRouter);
  app.use("/api/auth", AuthRouter);
  app.use("/api/comment", CommentRouter);
  app.use("/api/upload", UploadRouter);

  app.use(errorHandle);

  server.listen(process.env.PORT || 9000, (err) => {
    if (err) throw err;
    console.log(
      `Server connected: http://localhost:` + `${process.env.PORT || 9000}`
    );
  });
}

main();
