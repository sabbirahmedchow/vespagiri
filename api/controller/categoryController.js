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


