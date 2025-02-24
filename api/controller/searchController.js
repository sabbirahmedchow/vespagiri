const { product } = require("../model/adminModels/productModel.js");
const news = require("../model/adminModels/newsModel.js");

module.exports.getSeachResult = async(req, res) =>{
    try {
        const { srchQry } = req.query;
        const productSrchData = await product.find( {$or:[{ "name": { "$regex": `${srchQry}`, "$options": 'i' }}, {"description": { "$regex": `${srchQry}`, "$options": 'i' }} ]});
        const newsSrchData = await news.find( {$or:[{ "title": { "$regex": `${srchQry}`, "$options": 'i' }}, {"description": { "$regex": `${srchQry}`, "$options": 'i' }} ]});
        const allSeacrhData = [...productSrchData, ...newsSrchData];
        
        res.send(allSeacrhData);
    } catch (err) {
        res.send({ error: err.message });
    }
};