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
                                          <td><a href="cart.html" class="view">view</a></td>
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
                                            <td>{{wishlist_product.product_name}}</td>
                                            <td><img :src="'/img/product/product_small/' + wishlist_product.product_image" :alt="wishlist_product.product_name"></td>
                                            <td><a href="#" class="view">Add to Cart</a> | <a href="#" class="view">Delete</a></td>
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

let userData = ref([]);
let confMsg = ref(""); 
let userOrders = ref([]);
let wishlistProducts = ref([]);
let userId = document.cookie.split(';').find(row => row.startsWith('user_id')).split('=')[1];

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
            console.log(res.data);
    })
        .catch((err) => console.log(err));
}

onMounted(() => {
    getUserOrders();    
    getLoggedUserData();
    getWishlistProducts();
})
</script>