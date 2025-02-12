const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var newsSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  newsdate: {
    type: Date,
    default: Date.now
  },
  bigimage: {
    type: String
  },
  smallimage: {
    type: String
  },
});

var News = mongoose.model("news", newsSchema);

module.exports = News;
