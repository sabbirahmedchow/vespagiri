const { order,orderBilling,orderShipping,orderPayment } = require("../../model/orderModel.js");

module.exports.getOrder = async(req, res) => {
    try{
        orderRes = await order.find();
        res.render('order/order', {orderRes, data: req.cookies});
    }catch(err){
        res.render('order/order', {error: err.message, data: req.cookies});
    }
};

module.exports.orderDetail = async(req, res) => {
    try{
        let order_id = req.params.orderId;
        order_list = await order.find({ orderId: order_id });
        order_billing = await orderBilling.findOne({ orderId: order_id });
        order_shipping = await orderShipping.findOne({ orderId: order_id });
        order_payment = await orderPayment.findOne({ orderId: order_id });
        //orderRes = await order.find();
        res.render('order/order-detail', {order_id, ordered_list: order_list, order_billing: order_billing, order_shipping: order_shipping,  
            order_payment: order_payment, data: req.cookies});
    }catch(err){
        res.render('order/order-detail', {error: err.message, data: req.cookies});
    }
};

module.exports.changeOrderStatus = async(req, res) => {
    let newStatus = {
        order_status: req.body.status
    };
    const filter = { orderId: req.body.order_id };
    await order.updateMany(filter, newStatus);
    res.json({message: 'Order status has been changed'});
}
