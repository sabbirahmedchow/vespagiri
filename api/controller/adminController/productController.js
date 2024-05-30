const { product, productCategory, productBrand } = require("../../model/adminModels/productModel.js");
const category = require("../../model/adminModels/categoryModel");
const brand = require("../../model/adminModels/brandModel");


module.exports.getProduct = async(req, res) => {
    try{
        productRes = await product.find();
        res.render('product/product-list', {productRes, data: req.cookies});
    }catch(err){
        res.render('product/product-list', {error: err.message, data: req.cookies});
    }
};
module.exports.addNewProductForm = async(req, res) => {
    try{
        categoryRes = await category.find();
        brandRes = await brand.find();
        res.render('product/product-add', {categoryRes, brandRes, data: req.cookies});
    }catch(err){
        res.render('product/product-add', {error: err.message, data: req.cookies});
    }
    
};

module.exports.submitProduct = async(req, res) => {
    try{
       const newProduct = new product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image_big: req.files.bigimage[0].filename,
            image_small: req.files.smallimage[0].filename,
            is_sale: req.body.is_sale,
            is_featured: req.body.is_featured,
            sale_percentage: req.body.sale_percentage
            
        });
        await newProduct.save(); 

        if(req.body.category != ''){
        const newProdCat = new productCategory({
            product_id: newProduct._id,
            category_id: req.body.category
        });
        await newProdCat.save();
        }

        if(req.body.brand != ''){
        const newProdBrand = new productBrand({
            product_id: newProduct._id,
            brand_id: req.body.brand
        });
        await newProdBrand.save();
        }

        res.send("<p style='text-align:center; font-weight:bold;'>Product added successfully.</p>")
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