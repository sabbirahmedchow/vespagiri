const coupon = require("../../model/adminModels/couponModel");


module.exports.couponForm = async(req, res) => {
    try{
        
        res.render('misc/coupons', {data: req.cookies});
    }catch(err){
        res.render('misc/coupons', {error: err.message, data: req.cookies});
    }
};

module.exports.getCouponCode = async(req,res) =>{
       const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
       let result = "";
       for (let i = 0; i < req.body.length; i++) {
         result += chars.charAt(Math.floor(Math.random() * chars.length));
       }
       res.json({code: result, data: req.cookies});
      
};

module.exports.saveCouponCode = async(req,res) => {
    try{
        const newCoupon = new coupon({
             code: "VG-"+req.body.code,
             percent: req.body.coupon_percent,
             expired_on: req.body.coupon_expired,
         });
         await newCoupon.save(); 
         res.send("<p style='text-align:center; font-weight:bold;'>Coupon added successfully.</p>")
     }catch(err){
         res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred while saving. " + err.message + "</p>");      
     }
};

module.exports.getAllCoupon = async(req, res) => {
    try{
        couponList = await coupon.find();
        res.render('misc/coupon-list', {couponList, data: req.cookies});
    }catch(err){
        res.render('misc/coupon-list', {error: err.message, data: req.cookies});
    }
};
