const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const addAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: {
        addresses: req.body,
      },
    },
    { new: true }
  );
  res.status(200).json({
    status: "Success",
    message: "Address added successfully",
    data: user.addresses,
  });
});

const removeAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: {
        addresses: { _id: req.params.addressId },
      },
    },
    { new: true }
  );
  res.status(200).json({
    status: "Success",
    message: "Address removed successfully",
    data: user.addresses,
  });
});

const getLoggedUserAddressess = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("addresses");
  res.status(200).json({
    status: "Success",
    results: user.addresses.length,
    data: user.addresses,
  });
});

module.exports = {
  addAddress,
  removeAddress,
  getLoggedUserAddressess,
};
