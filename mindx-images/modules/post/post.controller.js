const PostModel = require("./post");
const CommentModel = require("../comment/comment");
const UserModel = require("../auth/user");
const jwt = require("jsonwebtoken");
const HttpError = require("../../common/httpError");

//[GET] api/posts/
const getAllPosts = async (req, res) => {
  try {
    const { keyword, createdBy, tag, skip, limit, sortField, sortDirection } =
      req.query;

    // cách search không dấu
    // title => slug(title) => mat-troi (slug)
    // keyword => slug(keyword) => trời => troi
    // { slug: { $regex: new RegExp(slug(keyword))}}

    // chuỗi có keyword ở bất vị trí vào
    // title: { $regex: new RegExp(keyword, 'i') }
    // chuỗi có keyword ở vị trí đầu
    // title: { $regex: new RegExp(`^${keyword}`, 'i') }
    // chuỗi có keyword ở vị trí cuối
    // title: { $regex: new RegExp(`${keyword}$`, 'i') }

    const createByFilter = createdBy ? { createdBy } : {};
    const tagFilter = tag ? { tags: tag } : {};
    const keywordFilter = keyword
      ? {
          $or: [
            { title: { $regex: new RegExp(`${keyword}`, "i") } },
            { description: { $regex: new RegExp(`${keyword}`, "i") } },
          ],
        }
      : {};

    const filter = {
      ...createByFilter,
      ...tagFilter,
      ...keywordFilter,
    };

    const pagination = {
      skip: skip ? Number(skip) : 0,
      limit: limit ? Number(limit) : 4,
    };

    const sortDirectionParams = sortDirection ? Number(sortDirection) : -1;
    const sortParams = sortField ? { [sortField]: sortDirectionParams } : {};

    // page bắt đầu từ 1
    // page = 1, skip 0, limit = pageOfSize = 4 => 0, 1, 2, 3,
    // page = 2, skip 4, limit = 4 => 4, 5, 6, 7
    // page = 3, skip 8, limit = 4 => 8, 9, 10, 11
    // skip = (page - 1) * pageOfSize
    // limit = pageOfSize
    // đá trách nhiệm client

    // tổng số 26
    // pageOfSize là 4
    // maxPage = Math.ceil(total / pageOfSize) // làm tròn lên

    // Nhận xét: tìm posts theo current page,
    // tìm tổng số post là 2 câu lệnh không liên quan lẫn nhau
    // có nhu cầu gọi song song
    // const posts = await
    //   PostModel
    //     .find(filter)
    //     .skip(pagination.skip)
    //     .limit(pagination.limit);

    // const totalPosts = await PostModel.find(filter).countDocuments();

    // const sortDirection = sortCreatedAt ? Number(sortCreatedAt) : -1;

    const [posts, totalPosts] = await Promise.all([
      PostModel.find(filter)
        .populate("createdBy", "-password -__v")
        .populate({
          path: "comments",
          populate: { path: "createdBy", select: "-password -__v" },
        })
        .skip(pagination.skip)
        .limit(pagination.limit)
        .sort(sortParams),
      PostModel.find(filter).countDocuments(),
    ]);
    res.send({
      success: 1,
      data: { data: posts, total: totalPosts },
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: error.message || "Something went wrong",
    });
  }
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
const createPost = async (req, res, next) => {
  const { user } = req;
  console.log("Create post", user);

  const newPostData = req.body;
  const newPost = await PostModel.create({
    ...newPostData,
    createdBy: user._id,
  });

  console.log("New post created", newPost);

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
