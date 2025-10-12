const PostModel = require("./post");
const CommentModel = require("../comment/comment");
const UserModel = require("../auth/user");
const jwt = require("jsonwebtoken");
const HttpError = require("../../common/httpError");

//[GET] api/posts/
const getAllPosts = async (req, res) => {
  const posts = await PostModel.find();
  res.send({
    success: 1,
    data: posts,
  });
};

//[GET] api/posts/:id
const getPost = async (req, res) => {
  const postId = req.params.id;
  const post = await PostModel.findById(postId);

  //validate postId
  if (!postId) {
    throw new HttpError("Không tìm thấy bài post",500);
  }

  res.send({
    success: 1,
    data: post,
  });
};

//[POST] api/posts
const createPost = async (req, res, next) => {
  const { user } = req;
  console.log("Create post", user);

  const newPostData = req.body;
  const newPost = await PostModel.create({
    ...newPostData,
    createBy: user._id,
  });

  res.send({
    success: 1,
    data: newPost,
  });
};

//[PUT] api/post/:postId
const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { user } = req;
  const updatePostData = req.body;
  const updatePost = await PostModel.findOneAndUpdate(
    { _id: postId, createBy: user._id },
    updatePostData,
    { new: true }
  );

  if (!updatePost) {
    throw new HttpError("Not fount post",500);
  }

  res.send({
    success: 1,
    data: updatePost,
  });
};

const deletePost = async (req, res) => {
  const { postId } = req.params.body;

  const deletePost = await PostModel.findOneAndDelete({ _id: postId });
  res.send({
    success: 1,
    data: deletePost,
  });
};

const incLikePost = async (req, res) => {
  const { postId } = req.params;
  const postModel = await PostModel.findOneAndUpdate(
    { _id: postId },
    { $inc: { likeCount: 1 } },
    { new: true }
  );
  res.send({
    success: 1,
    data: postModel,
  });
};

const getCommentByPost = async (req, res) => {
  const { postId } = req.params;
  const comments = await CommentModel.find({ postId });
  res.send({
    success: 1,
    data: comments,
  });
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  incLikePost,
  getCommentByPost,
};
