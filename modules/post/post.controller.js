const PostModel = require("./post");
const CommentModel = require("../comment/comment");
const UserModel = require("../auth/user");
const jwt = require("jsonwebtoken");

//[GET] api/posts/
const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.send({
      success: 1,
      dapa: posts,
    });
  } catch {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    });
  }
};

//[GET] api/posts/:id
const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId);

    //validate postId
    if (!postId) {
      throw new Error("Không tìm thấy bài post");
    }

    res.send({
      success: 1,
      data: post,
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: error.message || "Something went wrong",
    });
  }
};

//[POST] api/posts
const createPost = async (req, res, next) => {
  try {
    const { user } = req.user;

    const newPostData = req.body;
    const newPost = await PostModel.create({
      ...newPostData,
      createBy: user._id,
    });

    res.send({
      success: 1,
      data: newPost,
    });
  } catch (err) {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    });
  }
};

//[PUT] api/post/:postId
const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { user } = req;
    const updatePostData = req.body;
    const updatePost = await PostModel.findOneAndUpdate(
      { _id: postId, createBy: user._id },
      updatePostData,
      { new: true }
    );

    if (!updatePost) {
      throw new Error("Not fount post");
    }

    res.send({
      success: 1,
      data: updatePost,
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: error.message || "Something went wrong",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params.body;

    const deletePost = await PostModel.findOneAndDelete({ _id: postId });
    res.send({
      success: 1,
      data: deletePost,
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: error.message || "Something went wrong",
    });
  }
};

const incLikePost = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: error.message || "Some thing went wrong",
    });
  }
};

const getCommentByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await CommentModel.find({ postId });
    res.send({
      success: 1,
      data: comments,
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: error.message || "Some thing went wrong",
    });
  }
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
