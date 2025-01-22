const category = require("../model/adminModels/categoryModel");
const { productCategory } = require("../model/adminModels/productModel");

module.exports.getAllCategories = async(req, res) => {
    try{
        let numOfProductsInCategory;
        let numProdCat= {};
        categoryRes = await category.find();
        
        for(var i=0; i<categoryRes.length; i++)
        {
            numOfProductsInCategory = await productCategory.countDocuments({category_id: categoryRes[i]._id});
            numProdCat = {numProdInCat: numOfProductsInCategory}
            categoryRes[i] = {...categoryRes[i], ...numProdCat} 
        }
        
        res.send(categoryRes);
    }catch(err){
        res.send({error: err.message});
    }
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
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred. " + err.message + "</p>");
    }
    
};


