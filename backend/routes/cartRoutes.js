const express = require("express");

const { protect, allowedTo } = require("../controllers/authControllers");
const {
  addProductToCart,
  getLoggedUserCart,
  removeItemFromCart,
  clearCart,
  updateCartItemQuantity,
  applyCoupon,
} = require("../controllers/cartControllers");

const router = express.Router();

router.use(protect, allowedTo("user"));

router
  .route("/")
  .post(addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearCart);
router.route("/applyCoupon").put(applyCoupon);
router.route("/:itemId").put(updateCartItemQuantity).delete(removeItemFromCart);

module.exports = router;
