const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Review = require("../../models/reviewModel");

const createReviewValidator = [
  check("title").optional(),
  check("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating Value must be between 1 and 5"),
  check("user").isMongoId().withMessage("Invalid User Id"),
  check("product")
    .isMongoId()
    .withMessage("Invalid Product Id")
    .custom((product, { req }) =>
      Review.findOne({ user: req.user._id, product: product }).then(
        (review) => {
          if (review) {
            return Promise.reject(new Error("Product already reviewed"));
          }
        }
      )
    ),

  validatorMiddleware,
];
const getReviewValidator = [
  check("id").isMongoId().withMessage("Invalid Review Id"),
  validatorMiddleware,
];
const updateReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review Id")
    .custom((reviewId, { req }) =>
      Review.findById(reviewId).then((review) => {
        if (!review) {
          return Promise.reject(new Error("Invalid Review Id"));
        }
        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(
            new Error("You Are Not Allowed To Update This Review")
          );
        }
      })
    ),

  validatorMiddleware,
];

const deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review Id")
    .custom((reviewId, { req }) => {
      if (req.user.role === "user") {
        return Review.findById(reviewId).then((review) => {
          if (!review) {
            return Promise.reject(new Error("Invalid Review Id"));
          }
          if (review.user._id.toString() !== req.user._id.toString()) {
            return Promise.reject(
              new Error("You Are Not Allowed To Delete This Review")
            );
          }
        });
      }
      return true;
    }),
  validatorMiddleware,
];

module.exports = {
  getReviewValidator,
  deleteReviewValidator,
  updateReviewValidator,
  createReviewValidator,
};
