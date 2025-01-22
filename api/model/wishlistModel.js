const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var wishlistSchema = new Schema({
    user_id: String,
    product_id: String
    
});

var WishList = mongoose.model("wishlist", wishlistSchema);

module.exports = WishList;