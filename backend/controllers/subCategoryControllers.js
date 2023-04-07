const SubCategory = require("../models/subCategoryModel");
const factory = require("./handlersFactory");

const createFilterObject = (req, res, next) => {
  let filterObject = {};

  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObject = filterObject;
  next();
};
const getSubCategories = factory.getAll(SubCategory);

const getSubCategory = factory.getOne(SubCategory);

const setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
const createSubCategories = factory.createOne(SubCategory);
const updateSubCategory = factory.updateOne(SubCategory);

const deleteSubCategory = factory.deleteOne(SubCategory);

module.exports = {
  createSubCategories,
  getSubCategories,
  getSubCategory,
  deleteSubCategory,
  updateSubCategory,
  setCategoryIdToBody,
  createFilterObject,
};
