const router = require("express").Router();
const postController = require("./post.controller");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.post("/", postController.createPost);
// router.post("/", postController.createPost);

module.exports = router;