const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categoryModel");
const SubCategory = require("../../models/subCategoryModel");

const createProductsValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("Product Title must be at least 3 characters")
    .notEmpty()
    .withMessage("Product Required")
    .custom((title, { req }) => {
      req.body.slug = slugify(title);
      return true;
    }),
  check("description")
    .notEmpty()
    .withMessage("Product Description is Required")
    .isLength({ max: 2000 })
    .withMessage("Too Long Description"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is Required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product sold quantity must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is Required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("Too Long Price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .toFloat()
    .withMessage("Product price after discount must be a number")
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error(
          "Product price after discount must be less than original price"
        );
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("Product colors must be an array of strings"),
  check("coverImage").notEmpty().withMessage("Product cover image is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("Product images must be an array of strings"),
  check("category")
    .notEmpty()
    .withMessage("Product Must belong to a category")
    .isMongoId()
    .withMessage("Invalid Id Format")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No Category For This Id ${categoryId} `)
          );
        }
      })
    ),
  check("subcategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid Id Format")
    .custom((subcategoriesIds) =>
      SubCategory.find({ _id: { $exists: true, $in: subcategoriesIds } }).then(
        (result) => {
          if (result.length < 1 || result.length !== subcategoriesIds.length) {
            return Promise.reject(
              new Error(`One Or More Subcategories Are Not Found`)
            );
          }
        }
      )
    )
    .custom((subcategoriesIds, { req }) =>
      SubCategory.find({ category: req.body.category }).then((result) => {
        const subCategoriesInDB = [];
        result.forEach((subCategory) => {
          subCategoriesInDB.push(subCategory._id.toString());
        });
        const validate = subcategoriesIds.every((id) =>
          subCategoriesInDB.includes(id)
        );
        if (!validate) {
          return Promise.reject(
            new Error(`Subcategories Do Not Belongs To Category`)
          );
        }
      })
    ),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Ratings Average must be a number")
    .isLength({ min: 1 })
    .withMessage("Rating Must be less than or equal to 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating Must be greater than or equal to 5.0"),
  check("ratingQuantity")
    .optional()
    .isNumeric()
    .withMessage("Ratings Quantity must be a number"),
  validatorMiddleware,
];
const getProductValidator = [
  check("id").isMongoId().withMessage("Invalid Id Format"),
  validatorMiddleware,
];
const updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid Id Format"),
  body("title")
    .optional()
    .custom((title, { req }) => {
      req.body.slug = slugify(title);
      return true;
    }),
  validatorMiddleware,
];
const deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid Id Format"),
  validatorMiddleware,
];
module.exports = {
  createProductsValidator,
  getProductValidator,
  deleteProductValidator,
  updateProductValidator,
};
