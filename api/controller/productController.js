const { product, productCategory, productBrand } = require("../model/adminModels/productModel.js");
const category = require("../model/adminModels/categoryModel");
const brand = require("../model/adminModels/brandModel");

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

module.exports.getAllProducts = async(req, res) => {
    try{
        productRes = await product.find();
        res.send(productRes);
    }catch(err){
        res.send({error: err.message});
        
    }
};

module.exports.getProductsByCategory = async(req, res) => {
    try{
        let getProduct = [];
        category_id = req.query.categoryId
        productsByCategory = await productCategory.find({category_id});            
        for(var i=0; i<productsByCategory.length; i++)
        {
            getProduct[i] = await product.findOne({ _id: productsByCategory[i].product_id }); 
        }
        //console.log(getProduct);
        res.send(getProduct);   
    }catch(err){
        res.send({error: err.message});
    }
};

module.exports.getProductsByBrand = async(req, res) => {
    try{
        let getProduct = [];
        brand_id = req.query.brandId
        productsByBrand = await productBrand.find({brand_id});            
        for(var i=0; i<productsByBrand.length; i++)
        {
            getProduct[i] = await product.findOne({ _id: productsByBrand[i].product_id }); 
        }
        //console.log(getProduct);
        res.send(getProduct);   
    }catch(err){
        res.send({error: err.message});
    }
};

module.exports.getProductsByRange = async(req, res) => {
    try{
        
        low = req.query.low;
        high = req.query.high;
        high = high.replace('+',''); //there is a '+' sign with the high part that needs to be removed.
        productsByRange = await product.find({ price : { $gt :  low, $lt : high}});            
        res.send(productsByRange);   
    }catch(err){
        res.send({error: err.message});
    }
};





