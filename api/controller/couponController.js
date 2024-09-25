const coupon = require("../model/adminModels/couponModel");

module.exports.verifyCouponCode = async(req, res) =>{
    getCoupon = await coupon.findOne({ code: req.query.couponCode })
    if(getCoupon != null){
        if(getCoupon.expired_on.toLocaleDateString() >= new Date().toLocaleDateString())
            res.send({coupon_precent: getCoupon.percent});
        else
            res.status(422).json({message: "This coupon has expired."});
    }
    else{
        res.status(404).json({message: "Invalid Coupon Code"});
    }

};
