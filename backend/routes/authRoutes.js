const express = require("express");

const {
  signUpValidator,
  loginValidator,
} = require("../utils/validators/authValidators");
const {
  signUp,
  login,
  forgotPassword,
  verifyResetCode,
  resetPassword,
} = require("../controllers/authControllers");

const router = express.Router();
router.route("/signup").post(signUpValidator, signUp);
router.route("/login").post(loginValidator, login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/verifyResetCode").post(verifyResetCode);
router.route("/resetPassword").put(resetPassword);
// router
//   .route("/:id")
//   .get(getUserValidator, getUser)
//   .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
//   .delete(deleteUserValidator, deleteUser);

module.exports = router;
