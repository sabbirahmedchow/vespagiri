<template>
    <!--Breadcrumb section-->
    <div class="breadcrumb_section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="breadcrumb_inner">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><i class="zmdi zmdi-chevron-right"></i></li>
                            <li>Order Complete</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Breadcrumb section end-->

    <!--Main Content-->
    <div class="container">
        <div class="checkout-success-content py-2" id="print-invoice">
            <!--Order Card-->
            <div class="row">
                <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="checkout-scard card border-0 rounded">
                        <div class="card-body text-center">
                            <p class="card-icon"><i class="ion-checkmark-circled"></i></p>
                            <h4 class="card-title">Thank you for your order!</h4>
                            <p class="card-text mb-1">You will receive an order confirmation email with details of your order and a link to track its progress.</p>
                            <p class="card-text mb-1">All necessary information about the delivery, we sent to your email</p>
                            <p class="card-text text-order badge bg-success my-3">Your order # is: <b>{{order_id}}</b></p>
                            <p class="card-text mb-0">Order date: {{new Date(order_date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!--End Order Card-->
            <!--Order Summary-->
            <div class="row">
                <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                    <div class="checkout-item-ordered">
                        <h2 class="fs-6 mb-3">Order Summary</h2>
                        <div class="table-content table-responsive order-table mb-4">
                            <table class="table table-bordered align-middle table-hover text-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="fw-bold">Image</th>
                                        <th class="text-start fw-600">Product Name</th>
                                        <th class="fw-600">Price</th>
                                        <th class="fw-600">Qty</th>
                                        <th class="fw-600">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="order in order_details" :key="order._id">
                                        <td class="pro-img"><img class="primary blur-up lazyloaded" :src="'/img/product/product_small/' + order.product_image" :alt="order.product_name" :title="order.product_name" width="80"></td>
                                        <td class="pro-name text-start">
                                            {{ order.product_name }}
                                            <div class="cart__meta-text">
                                                Color: Black<br>Size: Small<br>
                                            </div>
                                        </td>
                                        <td class="pro-price">&#2547; {{parseFloat(order.product_price).toFixed(2)}}</td>
                                        <td class="pro-qty">{{order.product_quantity}}</td>
                                        <td class="pro-total fw-500">&#2547; {{parseFloat(order.subtotal).toFixed(2)}}</td>
                                    </tr>
                                    
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="4" class="item subtotal text-end fw-bolder">Total:</td>
                                        <td class="fw-500 last">&#2547; {{parseFloat(total_cost).toFixed(2)}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" class="item discount text-end fw-bolder">Discount:</td>
                                        <td class="fw-500 last">&#2547; {{parseFloat(discount).toFixed(2)}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" class="item shipping text-end fw-bolder">Shipping:</td>
                                        <td class="fw-500 last">&#2547; {{parseFloat(shipping).toFixed(2)}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" class="item total text-end fw-bolder">Grand Total:</td>
                                        <td class="fw-500 last">&#2547; {{parseFloat(grand_total).toFixed(2)}}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                    <div class="ship-info-details shipping-method-details">
                        <div class="row g-0">
                            <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                                <div class="shipping-details mb-4 mb-sm-0 clearfix" v-for="orderShipping in order_shipping" style="width:500px">
                                    <h3>Shipping Address</h3>
                                    <p>{{orderShipping.shippingAddress}}</p>
                                    <p>{{orderShipping.shippingCity}}</p>
                                    <p>Bangladesh</p>
                                    <p>+880-{{orderShipping.shippingPhone}}</p>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                                <div class="billing-details clearfix" v-for="orderBiling in order_billing">
                                    <h3>Billing Address</h3>
                                    <p>{{orderBiling.billingAddress}}</p>
                                    <p>{{orderBiling.billingCity}}</p>
                                    <p>Bangladesh</p>
                                    <p>+880-{{orderBiling.billingPhone}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ship-info-details billing-payment-details">
                        <div class="row g-0">
                            <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                                <div class="shipping-details mb-4 mb-sm-0 clearfix" style="width:500px">
                                    <h3>Shipping Method</h3>
                                    <p>Flat Rate - Fixeds</p>
                                    <p>Delivery Date: N/A</p>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                                <div class="billing-details clearfix">
                                    <h3>Payment Method</h3>
                                    <p>{{payment_method}}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex-wrap w-100 mt-4 text-center">
                        <input type="submit" @click="print" class="d-inline-flex align-items-center btn rounded me-2 mb-2 me-sm-3" value="Print Order" />
                        <input type="submit" class="d-inline-flex align-items-center btn rounded me-2 mb-2 me-sm-3" value="Back to Home" />
                    </div>
                </div>
            </div>
            <!--End Order Summary-->
        </div>
    </div>
    <!--End Main Content-->

</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from "axios";
import { usePaperizer } from 'paperizer'

const { paperize } = usePaperizer('print-invoice', {
  styles: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    '/css/style.css'
  ]
})
const print = () => {
  paperize()
}

const route = useRoute();

let order_details = ref([]);
let order_billing = ref([]);
let order_shipping = ref([]);

let total_cost = ref(0.00);
let discount = ref(0.00);
let shipping = ref(0.00);
let grand_total = ref(0.00);
let payment_method = ref("");

let order_date = ref("");

let order_id = ref("");

order_id.value = route.query.order_id;

const getOrderDetails = async() =>{
    return await axios.get('/api/orderDetails', {
    
    params: {
        orderId: route.query.order_id,
        
    }
    })
        .then((res) => {
            order_details.value = res.data.orderDetail;
            order_billing.value = res.data.orderBillingAddres;   
            order_shipping.value = res.data.orderShippingAddress;
            

            total_cost.value = res.data.orderPaymentDetail[0].totalCost - res.data.orderPaymentDetail[0].shipping_cost + res.data.orderPaymentDetail[0].discount;
            discount.value = res.data.orderPaymentDetail[0].discount;
            shipping.value = res.data.orderPaymentDetail[0].shipping_cost;
            grand_total.value = res.data.orderPaymentDetail[0].totalCost;
            payment_method.value = res.data.orderPaymentDetail[0].paymentMethod;

            order_date.value = res.data.orderDetail[0].order_date;
            //console.log(res.data.orderDetail[1].order_date); 
        })
        .catch((err) => console.log(err) )
   
}

onMounted(() => {
    getOrderDetails();
});

</script>