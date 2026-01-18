const CommentModel = require("./comment");

const getAllComment = async (req, res) => {
  try {
    const comments = await CommentModel.find();
    res.send({
      success: 1,
      data: comments,
    });
  } catch (error) {
    res.status(400).send({ success: 0, data: null, message: error.message });
  }
};

const createComment = async (req, res) => {
  console.log("req", req.body);
  try {
    const { postId, content } = req.body;
    const { user } = req;
    console.log("user dadnwg nhap", user);
    const comment = await CommentModel.create({
      postId,
      content,
      createdBy: user._id,
    });

    const cloneComment = JSON.parse(JSON.stringify(comment));
    console.log("cloneComment", cloneComment);
    const newComment = {
      ...cloneComment,
      content: comment.content,
      createdBy: { //kĩ thuật spread operator mục đích để lấy thông tin user từ req.user
        _id: user._id,
        username: user.username,
      },
    };
    console.log("newComment", newComment);
    res.send({
      success: 1,
      data: newComment,
    });
  } catch (error) {
    res
      .status(400)
      .send(
        { success: 0, data: null, message: error.message } ||
          "Something went wrong"
      );
  }
};
module.exports = {
  getAllComment,
  createComment,
};
