const brand = require("../model/adminModels/brandModel");
const { productBrand } = require("../model/adminModels/productModel");

module.exports.getAllBrands = async(req, res) => {
    try{
        let numOfProductsInBrand;
        let numProdBrand= {};
        brandRes = await brand.find();
        
        for(var i=0; i<brandRes.length; i++)
        {
            numOfProductsInBrand = await productBrand.countDocuments({brand_id: brandRes[i]._id});
            numProdBrand = {numProdInBrand: numOfProductsInBrand}
            brandRes[i] = {...brandRes[i], ...numProdBrand} 
        }
        
        res.send(brandRes);
    }catch(err){
        res.send({error: err.message});
    }
};