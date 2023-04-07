const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Product = require("../../models/productModel");

const wishlistValidator = [
  check("productId")
    .isMongoId()
    .withMessage("Invalid Product Id")
    .custom(async (productId) => {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }
    }),
  validatorMiddleware,
];

module.exports = {
  wishlistValidator,
};
