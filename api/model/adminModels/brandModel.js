const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var brandSchema = new Schema({
  name: {
    type: String,
    unique: true
  }
});

var Brand = mongoose.model("brands", brandSchema);

module.exports = Brand;
