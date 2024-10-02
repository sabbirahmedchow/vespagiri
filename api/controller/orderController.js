const {order, orderBilling, orderShipping, orderPayment} = require("../model/orderModel.js");

module.exports.submitOrder = async(req, res) => {
    let obj = JSON.parse(req.query.cart_info);
    let order_id = this.generateOrderId();
    let total_cost = parseInt(obj.discount) + parseInt(obj.shipping_cost) + parseInt(obj.final_amount);
    try{
        for(let i = 0; i < obj.cart.length; i++) {
            let product_price = parseFloat(obj.cart[i].product_price).toFixed(2)
            const newOrderProducts = new order({
                orderId: order_id,
                userId: req.query.billing.userId,
                product_name: obj.cart[i].product_name,
                product_quantity: obj.cart[i].product_quantity,
                product_price: product_price,
                subtotal: obj.cart[i].product_quantity * obj.cart[i].product_price,
            });
            await newOrderProducts.save(); 
        }

        const newOrderBilling = new orderBilling({
            orderId: order_id,
            userId: req.query.billing.userId,
            billingFirstName: req.query.billing.firstName,
            billingLastName: req.query.billing.lastName,
            billingCompany: req.query.billing.company,
            billingAddress: req.query.billing.address,
            billingAddress2: req.query.billing.address2,
            billingCity: req.query.billing.city,
            billingPhone: req.query.billing.phone,
            billingZip: req.query.billing.zip,
            billingEmail: req.query.billing.email,
            additional_note: req.query.billing.notes,
        });

        await newOrderBilling.save();

        if(req.query.billing.ship_diff == "")
        {
            const newOrderShipping = new orderShipping({
                orderId: order_id,
                userId: req.query.billing.userId,
                shippingFirstName: req.query.billing.firstName,
                shippingLastName: req.query.billing.lastName,
                shippingCompany: req.query.billing.company,
                shippingAddress: req.query.billing.address,
                shippingAddress2: req.query.billing.address2,
                shippingCity: req.query.billing.city,
                shippingPhone: req.query.billing.phone,
                shippingZip: req.query.billing.zip,
                shippingEmail: req.query.billing.email
                
            });
            await newOrderShipping.save();
        }   
        else{
            const newOrderShipping = new orderShipping({
                orderId: order_id,
                userId: req.query.billing.userId,
                shippingFirstName: req.query.shipping.sfirstName,
                shippingLastName: req.query.shipping.slastName,
                shippingCompany: req.query.shipping.scompany,
                shippingAddress: req.query.shipping.saddress,
                shippingAddress2: req.query.shipping.saddress2,
                shippingCity: req.query.shipping.scity,
                shippingPhone: req.query.shipping.sphone,
                shippingZip: req.query.shipping.szip,
                shippingEmail: req.query.shipping.semail
                
            });
            await newOrderShipping.save();
        } 

        

        const newOrderPayment = new orderPayment({
            orderId: order_id,
            userId: req.query.billing.userId,
            paymentMethod: req.query.paymentMode.payment_mode,
            discount: obj.discount,
            shipping_cost: obj.shipping_cost,
            totalCost: total_cost
        }); 

        await newOrderPayment.save();

          console.log("Added");
         //res.send("<p style='text-align:center; font-weight:bold;'>Category added successfully.</p>")
     }catch(err){
        console.log("cannot added", err.message);
         //res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred while saving. " + err.message + "</p>");      
     }
};

module.exports.generateOrderId = (req,res) =>{
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};


module.exports.addNewProductForm = async(req, res) => {
    try{
        categoryRes = await category.find();
        brandRes = await brand.find();
    }catch(err){
        res.render('product/product-add', {error: err.message});
    }
    res.render('product/product-add', {categoryRes, brandRes});
};

module.exports.submitCategory = async(req, res) => {
    try{
       const newCategory = new category({
            name: req.body.category,
        });
        await newCategory.save(); 
        res.send("<p style='text-align:center; font-weight:bold;'>Category added successfully.</p>")
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred while saving. " + err.message + "</p>");      
    }
};

module.exports.editCategoryForm = async(req, res) => {
    try{
        getCat = await category.findOne({ _id: req.params.catId })
        res.render('misc/category-edit', {name: getCat.name, cat_id: req.params.catId});
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred. " + err.message + "</p>");
    }
    
};

module.exports.editCategory = async(req, res) => {
    try{
        const data = {name: req.body.category};
        const id = {_id: req.body.catId };
        await category.findByIdAndUpdate(id, data)
        res.send("<p style='text-align:center; font-weight:bold;'>Category updated successfully.</p>")
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred while updating." + err.message + "</p>");      
    }
    
};

module.exports.deleteCategory = async(req, res) => {
    try{
        await category.deleteOne({ _id: req.params.catId })
    }catch(err){
        res.send("<p style='text-align:center; font-weight:bold; padding:5px; color: red;'>An error occurred. " + err.message + "</p>");
    }
    
};