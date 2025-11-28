const router = require("express").Router();
const authController = require("./auth.controller");
const authValid = require("./auth.validation");
const validateInput = require("../../common/middlewares/validateInput");

router.post(
  "/signup",
  validateInput(authValid.signupSchema, "body"),
  authController.signUp
);
router.post(
  "/login",
  validateInput(authValid.loginSchema, "body"),
  authController.login
);

module.exports = router;
