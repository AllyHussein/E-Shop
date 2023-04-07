const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Order Must Belongs To User"],
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Cart is Empty"],
      },
      quantity: Number,
      price: Number,
      color: String,
    },
  ],
  taxPrice: {
    type: Number,
    default: 0,
  },
  shippingAddress: {
    details: String,
    city: String,
    phone: String,
    postalcode: String,
  },
  shippingPrice: {
    type: Number,
    default: 0,
  },
  totalOrderPrice: {
    type: Number,
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Card"],
    default: "Cash",
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: Date,
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: Date,
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name profileImg email phone",
  }).populate({
    path: "orderItems.product",
    select: "title coverImage",
  });
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
