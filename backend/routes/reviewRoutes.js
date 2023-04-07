const express = require("express");

const { protect, allowedTo } = require("../controllers/authControllers");
const {
  getReviews,
  createReviews,
  getReview,
  updateReview,
  deleteReview,
  createFilterObject,
  setProductAndUserIdsToBody,
} = require("../controllers/reviewControllers");
const {
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../utils/validators/reviewValidators");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObject, getReviews)
  .post(
    protect,
    allowedTo("user"),
    setProductAndUserIdsToBody,
    createReviewValidator,
    createReviews
  );
router
  .route("/:id")
  .get(getReview)
  .put(protect, allowedTo("user"), updateReviewValidator, updateReview)
  .delete(
    protect,
    allowedTo("user", "manager", "admin"),
    deleteReviewValidator,
    deleteReview
  );

module.exports = router;
