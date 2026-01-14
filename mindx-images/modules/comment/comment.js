const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    content: { type: String, require: true },
    postId: { type: mongoose.Schema.Types.ObjectId, require: true },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamp: true,
  }
);

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
