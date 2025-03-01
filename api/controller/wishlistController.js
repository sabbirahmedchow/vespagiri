const wishlist = require("../model/wishlistModel");
const { product } = require("../model/adminModels/productModel.js");

module.exports.addWishlist = async (req, res) => {
    try {
        const newWishlist = new wishlist({
            user_id: req.body.params.user_id,
            product_id: req.body.params.product_id
        });
        if (await wishlist.findOne({ user_id: req.body.params.user_id, product_id: req.body.params.product_id })) {
            res.send({checkExists: "This item already added to your wishlist."});
        }
        await newWishlist.save();
        res.send("Success");
    } catch (err) {
        res.send({ error: err.message });
    }
};

module.exports.getWishlist = async (req, res) => {
    try {
        const wish_list = await wishlist.find({ user_id: req.user });
        const product_info = await product.find({ _id: { $in: wish_list.map((item) => item.product_id) } });
        res.send(product_info);
    } catch (err) {
        res.send({ error: err.message });
    }
}

module.exports.deleteWishlistProduct = async (req, res) => {
    try {
        await wishlist.deleteOne({ user_id: req.body.user_id, product_id: req.body.product_id });
        res.send("Success");
    }
    catch (err) {
        res.send({ error: err.message });
    }
}