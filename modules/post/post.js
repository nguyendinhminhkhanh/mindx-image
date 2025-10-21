const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      require: true,
    },
    title: { type: String, require: true },
    description: { type: String },
    likeCount: { type: Number, default: 0 },
    tags: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
});

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;
