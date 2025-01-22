const wishlist = require("../model/wishlistModel");
const { product } = require("../model/adminModels/productModel.js");

module.exports.addWishlist = async (req, res) => {
    try {
        const newWishlist = new wishlist({
            user_id: req.body.params.user_id,
            product_id: req.body.params.product_id
        });
        await newWishlist.save();
        res.send("Success");
    } catch (err) {
        res.send({ error: err.message });
    }
};

module.exports.getWishlist = async (req, res) => {
    try {
        const wish_list = await wishlist.find({ user_id: req.user });
        const data = await product.aggregate([
            {
                $lookup: {
                from: "products",
                    pipeline: [
                    {
                        $match: {
                        $expr: {
                            $in: [
                                "$_id",
                                wish_list.map((item) => item.product_id)
                            ]
                        }
                    }
                    }
                    ],
                    as: "result"
                }
            },
            {
                $project: {
                    _id: 0,
                    "productName": "$result.name",
                    "productImage": "$result.image_small",
                    
                }
            }
        ]);

        res.send(data);
    } catch (err) {
        res.send({ error: err.message });
    }
}