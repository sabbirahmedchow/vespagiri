const { data } = require("jquery");
const user = require("../../model/userModel.js");
var bcrypt = require("bcrypt");


module.exports.getUser = async(req, res) => {
    try{
        userRes = await user.find();
        res.render('user/user', {userRes, data: req.cookies});
    }catch(err){
        res.render('user/user', {error: err.message, data: req.cookies});
    }
};

module.exports.getAccount = async(req, res) => {
    try{
        userRes = await user.findOne({username: "admin"});
        res.render('account', {udata: userRes, data: req.cookies});
    }catch(err){
        res.render('account', {error: err.message, data: req.cookies});
    }
};

module.exports.updateAdminData = async(req, res) => {
    try{
        //set updated cookie value
        res.cookie("fullname", req.body.fullname);
        res.cookie("email", req.body.email);
       
        if(req.file != undefined)
        {
            res.cookie("image", req.file.originalname);
            var data1 = {avatar: req.file.originalname}
        }
        else
        {
            var data1 = {avatar: req.body.user_avatar}
        }

        if(req.body.password != '')
        {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            var data2 = {fullname: req.body.fullname, mobile: req.body.mobile, email: req.body.email, username: req.body.username, password: hash};
            var data = {...data2, ...data1};
        }
        else{
            var data2 = {fullname: req.body.fullname, mobile: req.body.mobile, email: req.body.email, username: req.body.username};
            var data = {...data2, ...data1};
            
        }
        const id = {_id: req.body.user_id };
        await user.findByIdAndUpdate(id, data)
        res.send("<p style='text-align:center; font-weight:bold;'>Account updated successfully.</p>")
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred while updating." + err.message + "</p>");
    }
};
