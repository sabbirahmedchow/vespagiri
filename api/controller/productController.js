const { product, productCategory, productBrand } = require("../model/adminModels/productModel.js");
const category = require("../model/adminModels/categoryModel");
const brand = require("../model/adminModels/brandModel");

module.exports.getAllProducts = async(req, res) => {
    try{
        productRes = await product.find().sort({_id: -1});
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

module.exports.getFeaturedProducts = async(req, res) => {
    try{
        is_featured = true;
        productRes = await product.find({is_featured}).sort({_id: -1}).limit(6);
        res.send(productRes);
    }catch(err){
        res.send({error: err.message});
        
    }
};

module.exports.getProductDetail = async(req, res) => {
    try{
        var url_title = req.query.product_name
        productDetail = await product.find({url_title});
        res.send(productDetail);
    }catch(err){
        res.send({error: err.message});
        
    }
};

module.exports.getRelatedProduct = async(req, res) => {
    try{
        var product_id = req.query.product_id;
        productCategory1 = await productCategory.find({product_id});

        const data = await product.aggregate([
            {
                $lookup: {
                from: "product_categories",
                pipeline: [
                {
                    $match: {
                    $expr: {
                        $eq: [
                            "$category_id",
                            productCategory1[0].category_id
                        ]
                    }
                    }
                }
                ],
                as: "result"
            }
            },
            {
                $project: {
                  _id: 0,
                  productByCategory: "$result"
                }
            },
            {
                $limit: 1
            },
            {
                $unwind: "$productByCategory"
            },
            {
                $project: {
                  "prod_id": '$productByCategory.product_id'
                }
            },
            {
            $lookup: {
                from: "products",
                let: { pid: "$prod_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", { $toObjectId: "$$pid" }]
                            }
                        }
                    }
                ],
                as: "product"
                }
                    
            },
            {
                $unwind: "$product"
            },
            {
                $project: {
                    _id: 0,
                    "productId": "$product._id",
                    "productName": "$product.name",
                    "productImage": "$product.image_medium",
                    "productPrice": "$product.price",
                    "productUrl" : "$product.url_title",
                    "productSalePercentage": "$product.sale_percentage",
                }
            }
        ]);
    res.send(data);
    }catch(err){
        res.send({error: err.message});
        
    }
};

module.exports.changeProductQuantityAfterOrder = async(product_id, product_quantity) => {
    try{
        let getProduct = await product.findOne({ _id: product_id });
        let new_quantity = getProduct.quantity - product_quantity;
        await product.findByIdAndUpdate(product_id, { quantity: new_quantity });
    }
    catch(err){
        console.log(err);
    }
};

