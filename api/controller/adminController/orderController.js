const order = require("../../model/adminModels/orderModel.js");

module.exports.getOrder = async(req, res) => {
    try{
        orderRes = await order.find();
        res.render('order/order', {orderRes, data: req.cookies});
    }catch(err){
        res.render('order/order', {error: err.message, data: req.cookies});
    }
};
module.exports.addNewProductForm = async(req, res) => {
    try{
        categoryRes = await category.find();
        brandRes = await brand.find();
    }catch(err){
        res.render('product/product-add', {error: err.message});
    }
    res.render('product/product-add', {categoryRes, brandRes});
};

module.exports.submitCategory = async(req, res) => {
    try{
       const newCategory = new category({
            name: req.body.category,
        });
        await newCategory.save(); 
        res.send("<p style='text-align:center; font-weight:bold;'>Category added successfully.</p>")
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred while saving. " + err.message + "</p>");      
    }
};

module.exports.editCategoryForm = async(req, res) => {
    try{
        getCat = await category.findOne({ _id: req.params.catId })
        res.render('misc/category-edit', {name: getCat.name, cat_id: req.params.catId});
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred. " + err.message + "</p>");
    }
    
};

module.exports.editCategory = async(req, res) => {
    try{
        const data = {name: req.body.category};
        const id = {_id: req.body.catId };
        await category.findByIdAndUpdate(id, data)
        res.send("<p style='text-align:center; font-weight:bold;'>Category updated successfully.</p>")
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred while updating." + err.message + "</p>");      
    }
    
};

module.exports.deleteCategory = async(req, res) => {
    try{
        await category.deleteOne({ _id: req.params.catId })
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred. " + err.message + "</p>");
    }
    
};