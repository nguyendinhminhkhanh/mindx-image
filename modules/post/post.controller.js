const PostModel = require("./post");
const CommentModel = require("../comment/comment");
const UserModel = require("../auth/user");
const jwt = require("jsonwebtoken");
const HttpError = require("../../common/httpError");

//[GET] api/posts/
const getAllPosts = async (req, res) => {
  const { createdBy, keyword, tag, skip, limit, sortDirection, sortField } =
    req.query;
  const createByFilter = createdBy ? { createdBy } : {};
  const keywordFilter = keyword
    ? {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      }
    : {};
  const tagFilter = tag ? { tags: tag } : {};

  const filter = {
    ...createByFilter,
    ...keywordFilter,
    ...tagFilter,
  };

  console.log("Filter:", filter);

  const pagination = {
    skip: skip ? Number(skip) : 0,
    limit: limit ? Number(limit) : 4,
  };

  const sortDirectionParams = sortDirection ? Number(sortDirection) : -1;
  const sortParams = sortField ? { [sortField]: sortDirectionParams } : {};

  // const sortDirection = sortCreateAt ? Number(sorCreateAt) : -1;
  const [posts, totalPosts] = await Promise.all([
    PostModel.find(filter)
      .populate("createdBy", "-password -__v") //populate xuoi
      .populate({
        //populate nguoc => virtual field
        path: "comments",
        populate: { path: "createdBy", select: "username" }, //populate multi level
      })
      .sort(sortParams)
      .skip(pagination.skip)
      .limit(pagination.limit),
    PostModel.find(filter).countDocuments(),
  ]);
  res.send({
    success: 1,
    data: {
      data: posts,
      total: totalPosts,
    },
  });
};

//[GET] api/posts/:id
const getPost = async (req, res) => {
  const postId = req.params.id;
  const post = await PostModel.findById(postId);

  //validate postId
  if (!postId) {
    throw new HttpError("Không tìm thấy bài post", 500);
  }

  res.send({
    success: 1,
    data: post,
  });
};

//[POST] api/posts
const createPost = async (req, res) => {
  const { user } = req;
  console.log("Create post", user);

  const newPostData = req.body;
  const newPost = await PostModel.create({
    ...newPostData,
    createdBy: user._id,
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
    throw new HttpError("Not fount post", 500);
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
