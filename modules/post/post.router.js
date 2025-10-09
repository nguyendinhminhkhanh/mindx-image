const router = require("express").Router();
const postController = require("./post.controller");
const isAuth = require("../../common/middlewares/isAuth");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.post("/", isAuth, postController.createPost);
router.put("/:postId", isAuth, postController.updatePost);
router.delete("/:postId", isAuth, postController.deletePost);
router.put("/:postId/like", isAuth,postController.incLikePost);
router.put("/:postId/comments", postController.getCommentByPost);

module.exports = router;
