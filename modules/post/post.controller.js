const PostModel = require("./post");

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
    const newPostData = req.body;
    const newPost = await PostModel.create(newPostData);

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
    const updatePostData = req.body;
    const updatePost = await PostModel.findOneAndUpdate(
      { _id: postId },
      updatePostData,
      { new: true }
    );
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

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
};
