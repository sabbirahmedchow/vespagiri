<template>
<!--Breadcrumb section-->
<div class="breadcrumb_section">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="breadcrumb_inner">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><i class="zmdi zmdi-chevron-right"></i></li>
                        <li>Account</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<!--Breadcrumb section end-->

<!-- Start Maincontent  -->
<section class="main_content_area my_account ptb-100">
    <div class="container">
        <div class="account_dashboard">
            <div class="row">
                <div class="col-sm-12 col-md-3 col-lg-3">
                    <!-- Nav tabs -->
                    <div class="dashboard_tab_button">
                        <ul role="tablist" class="nav flex-column dashboard-list">
                            <li><a href="#orders" data-toggle="tab" class="nav-link active">My Orders</a></li>
                            <li><a href="#wishlist" data-toggle="tab" class="nav-link">Wishlist</a></li>
                            <li><a href="#account-details" data-toggle="tab" class="nav-link">Account details</a></li>
                        </ul>
                    </div>    
                </div>
                <div class="col-sm-12 col-md-9 col-lg-9">
                    <!-- Tab panes -->
                    <div class="tab-content dashboard_content">
                        
                        <div class="tab-pane fade show active" id="orders">
                            <h3>Orders</h3>
                            <div class="lion_table_area table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th></th>	 	 	 	
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="user_order in userOrders">
                                          <td>{{user_order.orderId}}</td>
                                          <td>{{user_order.product_name}}</td>
                                          <td>{{user_order.product_price}}</td>
                                          <td>{{user_order.product_quantity}}</td>
                                          <td>{{new Date(user_order.order_date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}}</td>
                                          <td>{{parseFloat(user_order.subtotal).toFixed(2)}}</td>
                                          <td class="success">{{user_order.order_status}}</td>
                                          <td><a href="#" @click="getOrderDetails(user_order.orderId)" class="view">view</a></td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="wishlist">
                            <h3>Wishlist</h3>
                            <div class="lion_table_area table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Product Image</th>
                                            <th>Action</th>	 	 	 	
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="wishlistProducts.length == 0">
                                            <td><p>No products found in your wishlist.</p></td>
                                        </tr>
                                        <tr v-for="wishlist_product in wishlistProducts">
                                            <td>{{wishlist_product.name}}</td>
                                            <td><img :src="'/img/product/product_small/' + wishlist_product.image_small" width="100" :alt="wishlist_product.name"></td>
                                            <td><a href="#" @click="addToCart(wishlist_product)" class="view">Add to Cart</a> | <a href="#" @click="deleteProductFromWishlist(wishlist_product._id)" class="view">Delete</a></td>
                                        </tr>    
                                    </tbody>
                                </table> 
                            </div>           
                        </div>
                        
                        <div class="tab-pane fade" id="account-details">
                            <h3>Account details </h3>
                            <div class="login">
                                <div class="login_form_container">
                                    <div class="account_login_form" v-for="user_data in userData">
                                        <form method="post" v-on:submit="updateAccountDetails">
                                            <p style="color:#ff0000;">{{confMsg}}</p>
                                            <label><b>Full Name</b></label>
                                            <input type="text" name="fullname" readonly="readonly" :value="user_data.fullname">
                                            <label><b>Address(Your Billing Address)</b></label>
                                            <input type="text" name="address" :value="user_data.address">
                                            <label><b>Email</b></label>
                                            <input type="text" name="email" readonly="readonly" :value="user_data.email">
                                            <label><b>Password</b></label>
                                            <input type="password" name="password">
                                            
                                            <div class="login_submit">
                                                <button type="submit">Update</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row" id="order-details" >
                            <div class="col-12 col-sm-12 col-md-12 col-lg-6" style="width: 100%; float:left;">
                                <div class="checkout-item-ordered">
                                    <h2 class="fs-5 mb-3">Order Summary</h2>
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
                            <div class="col-12 col-sm-12 col-md-12 col-lg-6" style="width: 100%; float:left;">
                                <div class="ship-info-details shipping-method-details" style="width:500px">
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
                                <div class="ship-info-details billing-payment-details" style="width:500px">
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
                               
                            </div>
                            <p style="width: 100%; margin:0 auto; padding: 0; text-align:center;  font-size: 20px; "><a href="#" @click="showOrders();"> My Orders</a></p>  
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div> 
</section>			
<!-- End Maincontent  -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";
import { useRoute } from 'vue-router'
import { cartStore } from '@/store/cart.js'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const cartObj = cartStore();

let userData = ref([]);
let confMsg = ref(""); 
let userOrders = ref([]);
let wishlistProducts = ref([]);
let userId = document.cookie.split(';').find(row => row.startsWith('user_id')).split('=')[1];

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

const getLoggedUserData = async (userId) =>{
    return await axios.get('/api/my_account', {
    params: {
        user_id: userId
    }
    })
        .then((res) => {
            userData.value = res.data;
           
    })
        .catch((err) => console.log(err));

}
const updateAccountDetails = async (e,userId) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData.append('user_id', userId);
    return await axios.post('/api/updateProfile', formData)
        .then((res) => {
            confMsg.value = res.data;
            getLoggedUserData();
        })
        .catch((err) => console.log(err));
}

const getUserOrders = async (userId) => {
    return await axios.get('/api/getUserOrders', {
    params: {
        user_id: userId
    }
    })
        .then((res) => {
            userOrders.value = res.data;
            //console.log(res.data);
    })
        .catch((err) => console.log(err));
}

const getWishlistProducts = async (userId) => {
    return await axios.get('/api/showWishlist', {
    params: {
        user_id: userId
    }
    })
        .then((res) => {
            wishlistProducts.value = res.data;
            //console.log(res.data);
    })
        .catch((err) => console.log(err));
}

const deleteProductFromWishlist = async (product_id) => {
    if(confirm("Do you really want to delete?")){
        return await axios.delete('/api/deleteWishlistProduct', {
            data: {  
                product_id: product_id,
                user_id: userId
            }
        })
            .then((res) => {
                getWishlistProducts(userId);
                toast("Product removed from wishlist!", {
                    "theme": "auto",
                    "type": "success",
                    "dangerouslyHTMLString": true
                })
            })
            .catch((err) => console.log(err));
    }
}

const addToCart = (product) =>{
   if(cartObj.checkProductExistsOnCart(product._id))
   {
    let cartProduct = {
        product_id : product._id,
        product_name : product.name,
        product_price : product.price,
        product_image : product.image_small,
        product_quantity : 1
    };
    cartObj.cart.push(cartProduct);

    if(cartObj.coupon_percent != 0.00){
        cartObj.applyCoupon(cartObj.coupon_percent); // recalculate the discount if there is any previous coupon code.
    }
    toast("Product added to cart!", {
        "theme": "auto",
        "type": "success",
        "dangerouslyHTMLString": true
    })
   }
}

const showOrders = () => {
    document.getElementById('order-details').style.display = "none";
    document.getElementById('orders').style.display = "block";
}

const getOrderDetails = async(order_id) =>{
    document.getElementById('order-details').style.display = "block";
    document.getElementById('orders').style.display = "none";

    return await axios.get('/api/orderDetails', {
    
    params: {
        orderId: order_id,
        
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
    document.getElementById('order-details').style.display = "none";
    getUserOrders();    
    getLoggedUserData();
    getWishlistProducts();
  
})
</script>