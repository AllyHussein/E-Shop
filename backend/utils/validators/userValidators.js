const { check, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");

const getUserValidator = [
  check("id").isMongoId().withMessage("Invalid User Id"),
  validatorMiddleware,
];
const createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("User Required")
    .isLength({ min: 3 })
    .withMessage("Too Short User Name")
    .isLength({ max: 32 })
    .withMessage("Too Long User Name")
    .custom((name, { req }) => {
      req.body.slug = slugify(name);
      return true;
    }),

  check("email")
    .notEmpty()
    .withMessage("Email Required")
    .isEmail()
    .withMessage("Invalid Email")
    .custom((email) =>
      User.findOne({ email }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email Already Exists"));
        }
      })
    ),

  check("password")
    .notEmpty()
    .withMessage("Password Required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirmation) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  check("passwordConfirmation")
    .notEmpty()
    .withMessage("Password Confirmation Required"),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Only Egypts and Saudi Arabias Phone Numbers are Allowed"),
  check("profileImg").optional(),
  check("role").optional(),
  validatorMiddleware,
];

const updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User Id"),
  body("name")
    .optional()
    .custom((name, { req }) => {
      req.body.slug = slugify(name);
      return true;
    }),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid Email")
    .custom((email) =>
      User.findOne({ email }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email Already Exists"));
        }
      })
    ),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Only Egypts and Saudi Arabias Phone Numbers are Allowed"),
  check("profileImg").optional(),
  check("role").optional(),
  validatorMiddleware,
];

const changePasswordValidator = [
  check("id").isMongoId().withMessage("Invalid User Id"),
  body("password")
    .notEmpty()
    .withMessage("You Must Enter Your Current Password"),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("You Must Confirm Your Password"),
  body("newPassword")
    .notEmpty()
    .withMessage("You Must Enter Your New Password")
    .custom(async (newPassword, { req }) => {
      //verify password exists
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("User Not Found");
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!isCorrectPassword) {
        throw new Error("Incorrect Password");
      }

      //verify password confirm
      if (newPassword !== req.body.passwordConfirm) {
        throw new Error("Passwords do not match");
      }
    }),
  validatorMiddleware,
];

const deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid User Id"),
  validatorMiddleware,
];
const updateLoggedUserValidator = [
  body("name")
    .optional()
    .custom((name, { req }) => {
      req.body.slug = slugify(name);
      return true;
    }),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid Email")
    .custom((email) =>
      User.findOne({ email }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email Already Exists"));
        }
      })
    ),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Only Egypts and Saudi Arabias Phone Numbers are Allowed"),
  validatorMiddleware,
];

module.exports = {
  getUserValidator,
  deleteUserValidator,
  updateUserValidator,
  createUserValidator,
  changePasswordValidator,
  updateLoggedUserValidator,
};
