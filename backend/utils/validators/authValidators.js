const { check } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");

const signUpValidator = [
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
const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email Required")
    .isEmail()
    .withMessage("Invalid Email"),

  check("password")
    .notEmpty()
    .withMessage("Password Required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  validatorMiddleware,
];

module.exports = {
  signUpValidator,
  loginValidator,
};
