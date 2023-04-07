const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const ApiError = require("../utils/apiError");
const Coupon = require("../models/couponModel");

const calcTotalPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  cart.totalPrice = totalPrice;
  cart.totalPriceAfterDiscount = undefined;
  return totalPrice;
};

const addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body;
  const product = await Product.findById(productId);
  let cart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [
        {
          product: productId,
          color,
          price: product.price,
        },
      ],
    });
  } else {
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );
    if (productIndex > -1) {
      cart.cartItems[productIndex].quantity += 1;
    } else {
      cart.cartItems.push({
        product: productId,
        color,
        price: product.price,
      });
    }
  }

  calcTotalPrice(cart);

  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Product added Successfully To Cart",
    data: cart,
  });
});

const getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({
    user: req.user._id,
  });
  if (!cart) {
    return next(new ApiError("No Cart found for this user"));
  }
  res.status(200).json({
    status: "success",
    results: cart.cartItems.length,
    data: cart,
  });
});

const removeItemFromCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    {
      user: req.user._id,
    },
    {
      $pull: {
        cartItems: {
          _id: req.params.itemId,
        },
      },
    },
    { new: true }
  );
  calcTotalPrice(cart);

  await cart.save();
  res.status(200).json({
    status: "success",
    message: "Product removed Successfully From Cart",
    results: cart.cartItems.length,
    data: cart,
  });
});

const clearCart = asyncHandler(async (req, res, next) => {
  await Cart.findOneAndDelete({
    user: req.user._id,
  });
  res.status(204).send();
});

const updateCartItemQuantity = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;
  const { itemId } = req.params;
  const cart = await Cart.findOne({ user: req.user._id });
  const productIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === itemId
  );
  if (productIndex > -1) {
    cart.cartItems[productIndex].quantity = quantity;
  } else {
    return next(new ApiError("No such product"));
  }
  calcTotalPrice(cart);
  await cart.save();
  res.status(200).json({
    status: "success",
    message: "Product quantity updated Successfully",
    results: cart.cartItems.length,
    data: cart,
  });
});

const applyCoupon = asyncHandler(async (req, res, next) => {
  const { couponName } = req.body;
  const coupon = await Coupon.findOne({
    code: couponName,
    expires: {
      $gt: Date.now(),
    },
  });
  if (!coupon) {
    return next(new ApiError("Invaild or Expired Coupon"));
  }

  const cart = await Cart.findOne({ user: req.user._id });
  const totalCartPrice = cart.totalPrice;

  const cartTotalAfterDiscount = (
    totalCartPrice -
    (totalCartPrice * coupon.discount) / 100
  ).toFixed(2);

  cart.totalPriceAfterDiscount = cartTotalAfterDiscount;
  await cart.save();
  res.status(200).json({
    status: "success",
    message: "Coupon applied Successfully",
    results: cart.cartItems.length,
    data: cart,
  });
});

module.exports = {
  addProductToCart,
  getLoggedUserCart,
  removeItemFromCart,
  clearCart,
  updateCartItemQuantity,
  applyCoupon,
};
