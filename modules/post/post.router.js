const router = require("express").Router();
const postController = require("./post.controller");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.post("/", postController.createPost);
router.put("/:postId", postController.updatePost);
router.delete("/:postId", postController.deletePost);
router.put("/:postId/like", postController.incLikePost);
router.put("/:postId/comments", postController.getCommentByPost);

module.exports = router;
