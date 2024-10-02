const coupon = require("../model/adminModels/couponModel");

module.exports.verifyCouponCode = async(req, res) =>{
    getCoupon = await coupon.findOne({ code: req.query.couponCode })
    if(getCoupon != null){
        let coupon_date = new Date(getCoupon.expired_on.toLocaleDateString());
        let toDate = new Date(new Date().toDateString());
        if(coupon_date.getTime() >= toDate.getTime())
            res.send({coupon_precent: getCoupon.percent});
        else
            res.status(422).json({message: "This coupon has expired."});
    }
    else{
        res.status(404).json({message: "Invalid Coupon Code"});
    }

};
