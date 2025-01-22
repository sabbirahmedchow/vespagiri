const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var orderSchema = new Schema({
  orderId: String,
  userId: String,
  product_name: String,
  product_price: Number,
  product_quantity: Number,
  subtotal: Number,
  order_date: String,
  order_status: {
    type:String,
    default: "placed"
  },
   
});

var order = mongoose.model("orders", orderSchema);

var orderBillingSchema = new Schema({
  orderId: String,
  userId: String,
  billingFirstName: String,
  billingLastName: String,
  billingCompany: String,
  billingAddress: String,
  billingAddress2: String,
  billingCity: String,
  billingPhone: Number,
  billingZip: Number,
  billingEmail: String,
  additional_note: String
}); 
var orderBilling = mongoose.model("orders_billing", orderBillingSchema);

var orderShippingSchema = new Schema({
  orderId: String,
  userId: String,
  shippingFirstName: String,
  shippingLastName: String,
  shippingAddress: String,
  shippingAddress2: String,
  shippingCompany: String,
  shippingCity: String,
  shippingPhone: Number,
  shippingZip: Number,
  shippingEmail: String
  
}); 
var orderShipping = mongoose.model("orders_shipping", orderShippingSchema);

var orderPaymentSchema = new Schema({
  orderId: String,
  userId: String,
  paymentMethod: String,
  discount: Number,
  shipping_cost: Number,
  totalCost: Number,
  payment_status: {
    type: String,
    default: "Pending"
  }
});
var orderPayment = mongoose.model("orders_payment", orderPaymentSchema);

module.exports = 
{
  order,
  orderBilling,
  orderShipping,
  orderPayment
};
