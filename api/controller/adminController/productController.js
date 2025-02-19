const { product, productCategory, productBrand } = require("../../model/adminModels/productModel.js");
const category = require("../../model/adminModels/categoryModel");
const brand = require("../../model/adminModels/brandModel");


module.exports.getProduct = async(req, res) => {
    try{
        productRes = await product.find().sort({_id: -1});
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

module.exports.editProductForm = async(req, res) => {
    try{
        prodDetail = await product.findOne({ _id: req.params.prodId });
        prodCat = await productCategory.findOne({ product_id: req.params.prodId });
        prodBrand = await productBrand.findOne({ product_id: req.params.prodId });
        categoryList = await category.find();
        brandList = await brand.find();
        res.render('product/product-edit', {prodDetail, prodCat, prodBrand, categoryList, brandList, data: req.cookies});
    }catch(err){
        res.render('product/product-edit', {error: err.message, data: req.cookies});
    }
    
};

module.exports.submitProduct = async(req, res) => {
    try{
       const product_url = req.body.name.replace(/\s+/g, "-"); 
       const newProduct = new product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            image_big: req.files.bigimage[0].filename,
            image_medium: req.files.medimage[0].filename,
            image_small: req.files.smallimage[0].filename,
            is_sale: req.body.is_sale,
            is_featured: req.body.is_featured,
            sale_percentage: req.body.sale_percentage,
            url_title: product_url.toLowerCase()
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

module.exports.updateProduct = async(req, res) => {
    let updateProduct= '';
    try{
    const product_url = req.body.name.replace(/\s+/g, "-");
    if(req.file) 
    { 
        updateProduct = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            image_big: req.files.bigimage[0].filename,
            image_medium: req.files.medimage[0].filename,
            image_small: req.files.smallimage[0].filename,
            is_sale: req.body.is_sale,
            is_featured: req.body.is_featured,
            sale_percentage: req.body.sale_percentage,
            url_title: product_url.toLowerCase()
        };
    }
    else{
        updateProduct = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            image_big: req.body.bigimage_old,
            image_medium: req.body.medimage_old,
            image_small: req.body.smallimage_old,
            is_sale: req.body.is_sale,
            is_featured: req.body.is_featured,
            sale_percentage: req.body.sale_percentage,
            url_title: product_url.toLowerCase()
        };
    }
        const filter = { _id: req.body.product_id }
        await product.findOneAndUpdate(filter, updateProduct, {
            returnOriginal: false
          }); 

        if(req.body.category != ''){
        const updateProdCat = {
            category_id: req.body.category
        };
        const filterCat = { product_id: req.body.product_id }
        await productCategory.findOneAndUpdate(filterCat, updateProdCat, {
            returnOriginal: false
          }); 
        }

        if(req.body.brand != ''){
        const updateProdBrand = {
            brand_id: req.body.brand
        };
        const filterBrand = { product_id: req.body.product_id }
        await productBrand.findOneAndUpdate(filterBrand, updateProdBrand, {
            returnOriginal: false
          }); 
        }

        res.send("<p style='text-align:center; font-weight:bold;'>Product updated successfully.</p>")
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred while updating. " + err.message + "</p>");      
    }
};
