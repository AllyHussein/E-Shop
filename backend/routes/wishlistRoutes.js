const express = require("express");
const { protect, allowedTo } = require("../controllers/authControllers");
const {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
} = require("../controllers/wishlistControllers");
const { wishlistValidator } = require("../utils/validators/wishlistValidators");

const router = express.Router();

router.use(protect, allowedTo("user"));

router
  .route("/")
  .get(getLoggedUserWishlist)
  .post(wishlistValidator, addProductToWishlist);
router
  .route("/:productId")
  .delete(wishlistValidator, removeProductFromWishlist);

module.exports = router;
