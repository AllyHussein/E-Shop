const express = require("express");

const { protect, allowedTo } = require("../controllers/authControllers");
const {
  getCoupons,
  createCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/couponControllers");

const router = express.Router();
router.use(protect, allowedTo("admin", "manager"));
router.route("/").get(getCoupons).post(createCoupons);
router.route("/:id").get(getCoupon).put(updateCoupon).delete(deleteCoupon);

module.exports = router;
