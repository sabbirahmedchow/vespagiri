const express = require("express");
const mongoose = require("mongoose");
var path = require('path');
var parser = require('body-parser');
const cookieParser = require("cookie-parser");



//declare frontend routes
const userRoute = require("./routes/userRoutes");
const authRoute = require("./routes/authRoutes");
const productRoute = require("./routes/productRoutes");
const catRoute = require("./routes/categoryRoute");
const brandRoute = require("./routes/brandRoute");

//declare admin routes
const adminCatRoute = require("./routes/adminRoute/categoryRoute");
const adminBrandRoute = require("./routes/adminRoute/brandRoute");
const adminCouponRoute = require("./routes/adminRoute/couponRoute");
const adminProductRoute = require("./routes/adminRoute/productRoute");
const orderRoute = require("./routes/adminRoute/orderRoute");
const userListRoute = require("./routes/adminRoute/adminRoute");
const adminAuthRoute = require("./routes/adminRoute/authRoute");



const cors = require("cors");
//const jwt = require("jsonwebtoken");
require("dotenv").config();

//initialize express app
var app = express();

//set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/admin'));

//conect to DB
try {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DB_URI_LOCAL);
  console.log("Connected to MongoDB Successfully!");
} catch (error) {
  console.log("An error occured while connecting to database. " + error);
}

//declare middlewares
var corsOptions = {
  credentials: true,
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/admin/public'));
app.use(express.json({ extended: false }));
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.use(cookieParser());

//declare routes
app.use(authRoute);
app.use(userRoute);
app.use(productRoute);
app.use(catRoute);
app.use(brandRoute);

//admin routes
app.use(adminCatRoute);
app.use(adminBrandRoute);
app.use(adminCouponRoute);
app.use(adminProductRoute);
app.use(orderRoute);
app.use(userListRoute);
app.use(adminAuthRoute);


/*if(process.env.NODE_ENV === "production")
{
  app.use(express.static(__dirname + "/dist"));
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
  })
}*/


//run express server in a port
var port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Express server has started on port ${port}`);
});
