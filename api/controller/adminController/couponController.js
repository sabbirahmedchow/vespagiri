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
      
}