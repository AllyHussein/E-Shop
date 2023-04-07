const express = require("express");

const { protect, allowedTo } = require("../controllers/authControllers");
const {
  createCashOrder,
  filterOrderForLoggedUser,
  getAllOrders,
  getSpecificOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkoutSession,
} = require("../controllers/orderControllers");

const router = express.Router();
router.use(protect);

router
  .route("/checkout-session/:cartId")
  .get(allowedTo("user"), checkoutSession);

router.route("/:cartId").post(allowedTo("user"), createCashOrder);
router.get(
  "/",
  allowedTo("user", "admin", "manager"),
  filterOrderForLoggedUser,
  getAllOrders
);
router.get("/:id", getSpecificOrder);
router.put("/:id/pay", allowedTo("admin", "manager"), updateOrderToPaid);
router.put(
  "/:id/deliver",
  allowedTo("admin", "manager"),
  updateOrderToDelivered
);

module.exports = router;
