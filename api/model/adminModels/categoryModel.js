const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var catSchema = new Schema({
  name: {
    type: String,
    unique: true
  }
});

var Category = mongoose.model("categories", catSchema);

module.exports = Category;
