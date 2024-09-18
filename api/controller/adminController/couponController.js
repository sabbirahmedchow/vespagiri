module.exports.couponForm = async(req, res) => {
    try{
        
        res.render('misc/coupons', {data: req.cookies});
    }catch(err){
        res.render('misc/coupons', {error: err.message, data: req.cookies});
    }
};