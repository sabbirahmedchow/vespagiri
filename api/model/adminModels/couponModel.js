const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var couponSchema = new Schema({
  code: {
    type: String,
    unique: true
  },
  percent: Number,
  expired_on: {
    type: Date,
    default: new Date()
  }
});

var Coupon = mongoose.model("coupons", couponSchema);

module.exports = Coupon;
