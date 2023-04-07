const Review = require("../models/reviewModel");
const factory = require("./handlersFactory");

const setProductAndUserIdsToBody = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

const createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.productId };
  req.filterObject = filterObject;
  next();
};
const getReviews = factory.getAll(Review);

const getReview = factory.getOne(Review);

const createReviews = factory.createOne(Review);

const updateReview = factory.updateOne(Review);

const deleteReview = factory.deleteOne(Review);
module.exports = {
  createReviews,
  deleteReview,
  updateReview,
  getReviews,
  getReview,
  createFilterObject,
  setProductAndUserIdsToBody,
};
