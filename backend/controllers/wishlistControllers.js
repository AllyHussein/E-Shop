const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const addProductToWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: {
        wishlist: req.body.productId,
      },
    },
    { new: true }
  );
  res.status(200).json({
    status: "Success",
    message: "Product added successfully",
    data: user.wishlist,
  });
});

const removeProductFromWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: {
        wishlist: req.params.productId,
      },
    },
    { new: true }
  );
  res.status(200).json({
    status: "Success",
    message: "Product removed successfully",
    data: user.wishlist,
  });
});

const getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  res.status(200).json({
    status: "Success",
    results: user.wishlist.length,
    data: user.wishlist,
  });
});

module.exports = {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
};
