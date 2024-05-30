const category = require("../../model/adminModels/categoryModel");

module.exports.getCategory = async(req, res) => {
    try{
        categoryRes = await category.find();
        res.render('misc/category', {categoryRes, data: req.cookies});
    }catch(err){
        res.render('misc/category', {error: err.message, data: req.cookies});
    }
};
module.exports.addNewCategoryForm = (req, res) => {
    res.render('misc/category-add', {data: req.cookies});
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
        res.render('misc/category-edit', {name: getCat.name, cat_id: req.params.catId, data: req.cookies});
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
        res.status(200).json();
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred. " + err.message + "</p>");
    }
    
};