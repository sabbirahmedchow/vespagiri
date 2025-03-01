const newsletter = require("../model/newsletterModel.js");

module.exports.addToNewsletter = async(req, res) =>{
    try {
        const { sub_email } = req.body;
        const newsletterData = new newsletter({ newsletterEmail: sub_email });
        await newsletterData.save();
        res.send({ message: "Subscribed to newsletter successfully." });
       
    } catch (err) {
        if (err.code === 11000) {
            res.send({error: "Duplicate key error: Email already exists"});
          } else {
            res.send({error: error.message});
          }
    }
};