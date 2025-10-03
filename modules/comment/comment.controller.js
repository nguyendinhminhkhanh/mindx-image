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

module.exports = {
    getAllComment
};
