const router = require("express").Router();
const commentController = require("./comment.controller");

router.get("/", commentController.getAllComment);

module.exports = router;
