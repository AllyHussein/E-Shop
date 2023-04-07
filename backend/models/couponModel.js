const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        trim : true,
        required: [true, "Coupon Code Required"],
        unique: true
    },
    expires: {
        type: Date,
        required: [true, "Coupon Expiry Date Required"]
    },
    discount: {
        type: Number,
        required: [true, "Coupon Discount Required"]
    }
}, {timestamps : true})

const Coupon = mongoose.model('Coupon', couponSchema)

module.exports = Coupon