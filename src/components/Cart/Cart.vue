<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="cart-table table-responsive mb-40">
                    <table>
                        <thead>
                            <tr>
                                <th class="pro-thumbnail">Image</th>
                                <th class="pro-title">Product</th>
                                <th class="pro-price">Price</th>
                                <th class="pro-quantity">Quantity</th>
                                <th class="pro-subtotal">Total</th>
                                <th class="pro-remove">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="cartObj.cart.length > 0" v-for="cartProduct in cartObj.cart">
                                <td class="pro-thumbnail"><img :src="'/img/product/product_small/' + cartProduct.product_image" :alt=cartProduct.product_name></td>
                                <td class="pro-title"><a href="#">{{ cartProduct.product_name }}</a></td>
                                <td class="pro-price"><span class="amount">&#2547; {{ parseFloat(cartProduct.product_price).toFixed(2) }}</span></td>
                                <td class="pro-quantity"><div class="product-quantity"><input type="number" min="1" @click="cartObj.applyCoupon(cartObj.coupon_percent)" v-model.quantity = cartProduct.product_quantity /></div></td>
                                <td class="pro-subtotal">&#2547; {{ cartObj.getProductPriceByQuantity(cartProduct.product_id) }}</td>
                                <td class="pro-remove"><a href="#" @click="cartObj.deleteProductFromCart(cartProduct.product_id)">×</a></td>
                            </tr>
                            <tr v-else>
                                <td colspan="6"><p><b>No products in your cart.</b></p></td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-8 col-12">
                <div class="cart-buttons mb-30">
                    
                    <a href="/shop">Continue Shopping</a>
                </div>
                <div class="cart-coupon mb-40">
                    <h4>Coupon</h4>
                    <p>Enter your coupon code if you have one.</p>
                    <div class="coupon_form_inner">
                        <input type="text" :name=coupon_code v-model="coupon_code" placeholder="Coupon code" />
                        <input type="submit" value="Apply Coupon" @click.prevent="verifyCouponCode()" />
                    </div><br/>
                    <span style="margin: 0px 15px; color: red;">
                        <img v-if="isLoading === true" src="/images/loader.gif" width="80" alt="Loading" />
                        {{err_message}}</span>
                </div>
            </div>
            <div class="col-md-4 col-12">
                <div class="cart-total mb-40">
                    <h3>Cart Totals</h3>
                    <div class="table-responsive">
                        <table>
                            <tbody>
                                <tr class="cart-subtotal">
                                    <th>Subtotal</th>
                                    <td><span class="amount">&#2547; {{ cartObj.calculateSubTotalInCart() }}</span></td>
                                </tr>
                                <tr class="cart-subtotal">
                                    <th>Discount</th>
                                    <td><span class="amount">&#2547; {{ cartObj.discount }}</span></td>
                                </tr>
                                <tr class="order-total">
                                    <th>Total</th>
                                    <td>
                                        <strong><span class="amount">&#2547; {{ cartObj.calculateTotalInCart( cartObj.discount) }}</span></strong>
                                    </td>
                                </tr>											
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="proceed-to-checkout section mt-30">
                        <router-link :to=link @click="checkCart()">Proceed to Checkout</router-link>
                    </div>
                </div>
            </div>
            
            
        </div>
    </div>
</template>

<script setup>
import { cartStore } from '@/store/cart.js'
import {ref, onMounted} from 'vue'
import axios from "axios";
import { useRouter } from 'vue-router'

const cartObj = cartStore();
const route = useRouter();

const coupon_code = ref('');
const err_message = ref('');
const discount = ref(0.00);
let link = ref('');
let isLoading = ref(false);

const verifyCouponCode = async() =>{
    isLoading.value = true;
    return await axios.get('/api/verifyCouponCode', {
    params: {
        couponCode: coupon_code.value
    }
    })
        .then((res) => {
            isLoading.value = false;
            err_message.value = 'Coupon Added.'; 
            discount.value = cartObj.applyCoupon(res.data.coupon_precent);
        })
        .catch((err) => {
            isLoading.value = false;
            err_message.value = err.response.data.message
        })
}

const checkCart = () =>{
    if(cartObj.cart.length == 0)
    {
      alert("Your cart is empty. Add some product first.");
      route.push("/cart");
    } 
    return true;
}

onMounted(() => {
    if (document.cookie.indexOf('user_fullname') > -1  ) {
        
        link.value='/checkout';
}
else{
    link.value='/login?page=checkout';
}
})
</script>