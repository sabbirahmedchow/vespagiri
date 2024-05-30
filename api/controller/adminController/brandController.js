const brand = require("../../model/adminModels/brandModel");

module.exports.getBrand = async(req, res) => {
    try{
        brandRes = await brand.find();
        res.render('misc/brand', {brandRes, data: req.cookies});
    }catch(err){
        res.render('misc/brand', {error: err.message, data: req.cookies});
    }
};
module.exports.addNewBrandForm = (req, res) => {
    res.render('misc/brand-add', {data: req.cookies});
};

module.exports.submitBrand = async (req, res) => {
    try{
       const newBrand = new brand({
            name: req.body.brand,
        });
        await newBrand.save(); 
        return res.send("<p style='text-align:center; font-weight:bold;'>Brand added successfully.</p>")
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred while saving." + err.message + "</p>");      
    }
};

module.exports.editBrandForm = async(req, res) => {
    try{
        getBrand = await brand.findOne({ _id: req.params.brandId })
        res.render('misc/brand-edit', {name: getBrand.name, brand_id: req.params.brandId, data: req.cookies});
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred. " + err.message + "</p>");
    }
    
};

module.exports.editBrand = async(req, res) => {
    try{
        const data = {name: req.body.brand};
        const id = {_id: req.body.brandId };
        await brand.findByIdAndUpdate(id, data)
        res.send("<p style='text-align:center; font-weight:bold;'>Brand updated successfully.</p>")
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred while updating." + err.message + "</p>");      
    }
    
};

module.exports.deleteBrand = async(req, res) => {
    try{
        await brand.deleteOne({ _id: req.params.brandId })
        res.status(200).json();
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred. " + err.message + "</p>");
    }
    
};