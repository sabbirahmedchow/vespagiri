const {order, orderBilling, orderShipping, orderPayment} = require("../model/orderModel.js");
const { changeProductQuantityAfterOrder } = require("./productController.js");

module.exports.submitOrder = async(req, res) => {
    //console.log("Request: "+req.body.params.cart_info);
    let obj = JSON.parse(req.body.params.cart_info);
    //console.log(obj);
    let order_id = this.generateOrderId();
    let total_cost = parseInt(obj.final_amount);
    try{
        for(let i = 0; i < obj.cart.length; i++) {
            let product_price = parseFloat(obj.cart[i].product_price).toFixed(2)
            const newOrderProducts = new order({
                orderId: order_id,
                userId: req.body.params.billing.userId,
                product_name: obj.cart[i].product_name,
                product_quantity: obj.cart[i].product_quantity,
                product_image: obj.cart[i].product_image,
                product_price: product_price,
                order_date: new Date().toLocaleDateString(),
                subtotal: obj.cart[i].product_quantity * obj.cart[i].product_price,
            });
            await newOrderProducts.save(); 
            changeProductQuantityAfterOrder(obj.cart[i].product_id, obj.cart[i].product_quantity);
        }

        const newOrderBilling = new orderBilling({
            orderId: order_id,
            userId: req.body.params.billing.userId,
            billingFirstName: req.body.params.billing.firstName,
            billingLastName: req.body.params.billing.lastName,
            billingCompany: req.body.params.billing.company,
            billingAddress: req.body.params.billing.address,
            billingAddress2: req.body.params.billing.address2,
            billingCity: req.body.params.billing.city,
            billingPhone: req.body.params.billing.phone,
            billingZip: req.body.params.billing.zip,
            billingEmail: req.body.params.billing.email,
            additional_note: req.body.params.billing.notes,
        });

        await newOrderBilling.save();

        if(req.body.params.billing.ship_diff == "")
        {
            const newOrderShipping = new orderShipping({
                orderId: order_id,
                userId: req.body.params.billing.userId,
                shippingFirstName: req.body.params.billing.firstName,
                shippingLastName: req.body.params.billing.lastName,
                shippingCompany: req.body.params.billing.company,
                shippingAddress: req.body.params.billing.address,
                shippingAddress2: req.body.params.billing.address2,
                shippingCity: req.body.params.billing.city,
                shippingPhone: req.body.params.billing.phone,
                shippingZip: req.body.params.billing.zip,
                shippingEmail: req.body.params.billing.email
                
            });
            await newOrderShipping.save();
        }   
        else{
            const newOrderShipping = new orderShipping({
                orderId: order_id,
                userId: req.body.params.billing.userId,
                shippingFirstName: req.body.params.shipping.sfirstName,
                shippingLastName: req.body.params.shipping.slastName,
                shippingCompany: req.body.params.shipping.scompany,
                shippingAddress: req.body.params.shipping.saddress,
                shippingAddress2: req.body.params.shipping.saddress2,
                shippingCity: req.body.params.shipping.scity,
                shippingPhone: req.body.params.shipping.sphone,
                shippingZip: req.body.params.shipping.szip,
                shippingEmail: req.body.params.shipping.semail
                
            });
            await newOrderShipping.save();
        } 

        const newOrderPayment = new orderPayment({
            orderId: order_id,
            userId: req.body.params.billing.userId,
            paymentMethod: req.body.params.paymentMode.payment_mode,
            discount: obj.discount,
            shipping_cost: obj.shipping_cost,
            totalCost: total_cost
        }); 
        
        await newOrderPayment.save();

        res.json({ message: 'Success', order_id: order_id });
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
//get list of orders for logged in user
module.exports.getUserOrders = async (req, res) =>{
    //console.log("Request user: "+req.user);
      try{
      orderDetail = await order.find({userId: req.user}).sort({_id: -1});
      res.send(orderDetail);
      }catch(err){
          res.send({error: err.message});
            
      }
  };

module.exports.getOrderDetail = async (req, res) =>{
    //console.log("Request order: "+req.query.orderId);
      try{
      orderDetail = await order.find({orderId: req.query.orderId});
      orderBillingAddres = await orderBilling.find({orderId: req.query.orderId});
      orderShippingAddress = await orderShipping.find({orderId: req.query.orderId});
      orderPaymentDetail = await orderPayment.find({orderId: req.query.orderId});

      res.send({orderDetail,orderBillingAddres,orderShippingAddress,orderPaymentDetail});
      }catch(err){
          res.send({error: err.message});
            
      }
  };



