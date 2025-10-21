const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    content: { type: String, require: true },
    postId: { type: mongoose.Types.ObjectId, ref: "Post", require: true },
    createBy: { type: mongoose.Types.ObjectId, ref: "User", require: true },
  },
  {
    timestamp: true,
  }
);

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
