const router = require("express").Router();
const postController = require("./post.controller");
const isAuth = require("../../common/middlewares/isAuth");
const validateInput = require("../../common/middlewares/validateInput");
const postValid = require("./post.validation");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.post(
  "/",
  validateInput(postValid.createPostSchema, "body"),
  isAuth,
  postController.createPost
);
router.put("/:postId", isAuth, postController.updatePost);
router.delete("/:postId", isAuth, postController.deletePost);
router.put("/:postId/like", isAuth, postController.incLikePost);
router.put("/:postId/comments", postController.getCommentByPost);

module.exports = router;
