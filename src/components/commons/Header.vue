<template>
     <div class="header_middle">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-3 col-md-3">
                        <div class="logo">
                            <router-link to="/" onclick="test()"><img src="/img/logo/vespa-logo.png" alt="Vespagiri" height="100"></router-link>
                        </div>
                    </div>
                    <div class="col-lg-7 col-md-8">
                        <div class="category_search">
                            <form action="#" name="frm">
                                <div class="category_search_inner">
                                    <div class="select">
                                        <select name="categroy_search">
                                            <option value="1" selected>All Categories</option>
                                            <option value="2" >Latest Bikes</option>
                                            <option value="3" >Upcoming Bike</option>
                                            <option value="4" >popular Bike</option>
                                            <option value="5" >Best Selling Bike</option>
                                        </select>
                                    </div>
                                    <div class="search">
                                        <input type="text" placeholder="Search Keyword Here" name="txt">
                                    </div>
                                    <div class="submit">
                                        <button type="submit" name="btn"><i class="zmdi zmdi-search"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-1">
                        <div class="mini_cart_box_wrapper text-right">
                            <a href="#">
                                <img src="/img/icon/cart.png" alt="Mini Cart Icon">
                                <span class="cart_count">{{cartObj.cartTotalQuantity()}}</span>
                            </a>
                            <ul class="mini_cart_box">
                                <li> <a href="#" class="closeMiniCart">X</a></li>
                                <li class="single_product_cart" v-if="cartObj.cart.length > 0" v-for="cartProduct in cartObj.cart">
                                    <div class="cart_img">
                                        <a href="product-details.html"><img :src="'/img/product/product_small/' + cartProduct.product_image" :alt=cartProduct.product_name></a>
                                    </div>
                                    <div class="cart_title">
                                        <h5><a href="product-details.html"> {{cartProduct.product_name}}</a></h5>
                                        <h6><a href="#">Black</a></h6>
                                        <span>&#2547; {{ cartProduct.product_price }} x {{ cartProduct.product_quantity }}</span>
                                    </div>
                                    <div class="cart_delete">
                                        <a href="#" @click="cartObj.deleteProductFromCart(cartProduct.product_id)"><i class="zmdi zmdi-delete"></i></a>
                                    </div>
                                </li>
                                <li class="single_product_cart" v-else>
                                    <p><b>No products in your cart.</b></p>
                                </li>
                                
                                <li class="cart_space">
                                    <div class="cart_sub">
                                        <h4>Subtotal</h4>
                                    </div>
                                    <div class="cart_price">
                                        <h4>&#2547; {{ cartObj.calculateSubTotalInCart()}}</h4>
                                    </div>
                                </li>
                                <li>
                                    <router-link to="/cart" class="cart_btn">view cart</router-link>
                                    
                                    
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    
</template>
<script setup>
import { cartStore } from '@/store/cart.js'
import {ref, onMounted} from 'vue'

const cartObj = cartStore();
let link = ref('');

onMounted(() => {
    if (document.cookie.indexOf('user_fullname') > -1  ) {
        link.value='/checkout';
}
else{
    link.value='/login?page=checkout';
}
})

</script>
