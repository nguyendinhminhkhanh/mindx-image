const { ref } = require("joi");
const mongoose = require("mongoose");
const { post } = require("./post.router");

const PostSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      require: true,
    },
    title: { type: String, require: true },
    description: { type: String },
    likeCount: { type: Number, default: 0 },
    tags:[{
      type: mongoose.Types.ObjectId,
    }],
    createdBy: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },// option này chỉ nên define khi mà có dùng cơ hế virtual field
    toObject: { virtuals: true },// option này chỉ nên define khi mà có dùng cơ hế virtual field
  }
);

PostSchema.virtual("comments", {
  ref: "Comment", // The model to use
  localField: "_id", // Find people where `localField` // modal post
  foreignField: "postId", // post của bên model comment
});

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;
