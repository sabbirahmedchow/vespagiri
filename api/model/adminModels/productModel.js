const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var productSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  price: Number,
  description: String,
  quantity: {
    type:Number,
    default: 0
  },
  image_big: String,
  image_medium: String,
  image_small: String,
  is_sale: Boolean,
  is_featured: Boolean,
  sale_percentage: Number,
  url_title: String
  
});

var product = mongoose.model("products", productSchema);

var productCategorySchema = new Schema({
  product_id: String,
  category_id: String
 });

var productCategory = mongoose.model("product_category", productCategorySchema);

var productBrandSchema = new Schema({
  product_id: String,
  brand_id: String,
 });

var productBrand = mongoose.model("product_brand", productBrandSchema);

module.exports = {
  product,
  productCategory,
  productBrand
} 
