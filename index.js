require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PostRouter = require("./modules/post");
const AuthRouter = require("./modules/auth");
const CommentRouter = require("./modules/comment");
const log = require("./common/middlewares/log");

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("MongoDB connected!");

  const app = express();
  app.use(express.json());

  app.use(log);

  app.use("/api/posts", PostRouter);
  app.use("/api/auth", AuthRouter);
  app.use("/api/comment", CommentRouter);

  app.listen(process.env.PORT || 9000, (err) => {
    if (err) throw err;
    console.log("Server connected");
  });
}

main();
