const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categoryModel");

const getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory Id"),
  validatorMiddleware,
];
const createSubCategoriesValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory Required")
    .isLength({ min: 2 })
    .withMessage("Too Short SubCategory Name")
    .isLength({ max: 32 })
    .withMessage("Too Long SubCategory Name")
    .custom((name, { req }) => {
      req.body.slug = slugify(name);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("SubCategory Must Belong To A Category")
    .isMongoId()
    .withMessage("Invalid Category Id")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No Category For This Id ${categoryId} `)
          );
        }
      })
    ),
  validatorMiddleware,
];

const updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory Id"),
  body("name")
    .optional()
    .custom((name, { req }) => {
      req.body.slug = slugify(name);
      return true;
    }),
  validatorMiddleware,
];

const deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory Id"),
  validatorMiddleware,
];

module.exports = {
  getSubCategoryValidator,
  deleteSubCategoryValidator,
  updateSubCategoryValidator,
  createSubCategoriesValidator,
};
