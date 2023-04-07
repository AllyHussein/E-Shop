const express = require("express");

const {
  getProducts,
  createProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages,
} = require("../controllers/productControllers");
const {
  getProductValidator,
  createProductsValidator,
  deleteProductValidator,
  updateProductValidator,
} = require("../utils/validators/productValidators");

const { protect, allowedTo } = require("../controllers/authControllers");
const reviewRoutes = require("./reviewRoutes");

const router = express.Router();

router.use("/:productId/reviews", reviewRoutes);

router
  .route("/")
  .get(getProducts)
  .post(
    protect,
    allowedTo("admin", "manager"),
    uploadProductImages,
    resizeProductImages,
    createProductsValidator,
    createProducts
  );
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    protect,
    allowedTo("admin", "manager"),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
  )
  .delete(protect, allowedTo("admin"), deleteProductValidator, deleteProduct);

module.exports = router;
