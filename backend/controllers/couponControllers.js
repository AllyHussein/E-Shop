const factory = require("./handlersFactory");
const Coupon = require("../models/couponModel");

const getCoupons = factory.getAll(Coupon);

const getCoupon = factory.getOne(Coupon);

const createCoupons = factory.createOne(Coupon);

const updateCoupon = factory.updateOne(Coupon);

const deleteCoupon = factory.deleteOne(Coupon);
module.exports = {
  createCoupons,
  deleteCoupon,
  updateCoupon,
  getCoupons,
  getCoupon,
};
