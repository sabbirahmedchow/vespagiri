const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var newsletterSchema = new Schema({
    newsletterEmail: {
        type: String,
        required: true,
        unique: true
    }
    
});

var Newsletter = mongoose.model("newsletter", newsletterSchema);

module.exports = Newsletter;