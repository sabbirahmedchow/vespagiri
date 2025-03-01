<template>
    <div class="loader" v-if="isVisible"></div>
    <form action="#" @submit.prevent="sendOrderFormData" method="post">
    <div class="row">
        <div class="col-lg-6 col-md-12 col-12">
            
                <div class="checkbox-form">						
                    <h3>Billing Details</h3>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="country-select">
                                <label>Country <span class="required">*</span></label>
                                <select name="country" v-model="billing.country" required>
                                  <option value="BD">Bangladesh</option>
                                  
                                </select> 										
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="checkout-form-list">
                                <label>First Name <span class="required">*</span></label>										
                                <input type="text" v-model="billing.firstName" name="firstName" placeholder="" required />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="checkout-form-list">
                                <label>Last Name <span class="required">*</span></label>										
                                <input type="text" v-model="billing.lastName" name="lastName" placeholder="" required />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="checkout-form-list">
                                <label>Company Name</label>
                                <input type="text" v-model="billing.company" name="company" placeholder="" />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="checkout-form-list">
                                <label>Email</label>
                                <input type="email" v-model="billing.email" name="email" placeholder="" required />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="checkout-form-list">
                                <label>Address <span class="required">*</span></label>
                                <input type="text" v-model="billing.address" name="address" placeholder="Street address" required />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="checkout-form-list">									
                                <input type="text" v-model="billing.address2" name="address2" placeholder="Apartment, suite, unit etc. (optional)" />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="country-select">
                                <label>Division / City <span class="required">*</span></label>
                                <select name="city" v-model="billing.city" @change="cartObj.calculateShipping($event)" required>
                                    <option value="">Select</option>  
                                    <option value="Barishal">Barishal</option>
                                    <option value="Chattogram">Chattogram</option>
                                    <option value="Dhaka">Dhaka</option>
                                    <option value="Khulna">Khulna</option>
                                    <option value="Mymensingh">Mymensingh</option>
                                    <option value="Rajshahi">Rajshahi</option>
                                    <option value="Rangpur">Rangpur</option>
                                    <option value="Sylhet">Sylhet</option>
                                </select> 	
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="checkout-form-list">
                                <label>Phone <span class="required">*</span></label>										
                                <input type="text" v-model="billing.phone" name="phone" placeholder="" required />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="checkout-form-list">
                                <label>Postcode / Zip <span class="required">*</span></label>										
                                <input type="text" v-model="billing.zip" name="zip" required />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="checkout-form-list">
                                <label>Username </label>										
                                <input type="text" v-model="billing.username" name="username" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="checkout-form-list">
                                <label>Password </label>										
                                <input type="password" v-model="billing.password" name="password" />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="checkout-form-list create-acc">	
                                <input id="cbox" type="checkbox" name="is_create_account" v-model="billing.is_create_account" />
                                <label for="cbox">Create an account?</label>
                            </div>
                            
                        </div>								
                    </div>
                    <div class="different-address">
                        <div class="ship-different-title">
                            <h3>
                                <label for="ship-box">Ship to a different address?</label>
                                <input id="ship-box" type="checkbox" name="ship_diff" v-model="billing.ship_diff" />
                            </h3>
                        </div>
                        <div id="ship-box-info">
                            <div class="col-md-12">
                                <div class="country-select">
                                    <label>Country </label>
                                    <select v-model="shipping.scountry">
                                      <option value="BD" name="scountry">Bangladesh</option>
                                      
                                    </select> 										
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="checkout-form-list">
                                    <label>First Name</label>										
                                    <input type="text" placeholder="" name="sfirstName" v-model="shipping.sfirstName" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="checkout-form-list">
                                    <label>Last Name </label>										
                                    <input type="text" placeholder="" name="slastName" v-model="shipping.slastName" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="checkout-form-list">
                                    <label>Company Name</label>
                                    <input type="text" placeholder="" name="scompany" v-model="shipping.scompany" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="checkout-form-list">
                                    <label>Address </label>
                                    <input type="text" placeholder="Street address" name="saddress" v-model="shipping.saddress"/>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="checkout-form-list">									
                                    <input type="text" name="saddress2" v-model="shipping.saddress2" placeholder="Apartment, suite, unit etc. (optional)" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="checkout-form-list">
                                    <label>Division / City </label>
                                    <select name="scity" v-model="shipping.scity" @change="cartObj.calculateShipping($event)">
                                    <option value="">Select</option>  
                                    <option value="Barishal">Barishal</option>
                                    <option value="Chattogram">Chattogram</option>
                                    <option value="Dhaka">Dhaka</option>
                                    <option value="Khulna">Khulna</option>
                                    <option value="Mymensingh">Mymensingh</option>
                                    <option value="Rajshahi">Rajshahi</option>
                                    <option value="Rangpur">Rangpur</option>
                                    <option value="Sylhet">Sylhet</option>
                                </select> 	
                                </div>
                            </div>
                           <div class="col-md-12">
                                <div class="checkout-form-list">
                                    <label>Postcode / Zip </label>										
                                    <input type="text" placeholder="Postcode / Zip" name="szip" v-model="shipping.szip" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="checkout-form-list">
                                    <label>Email Address </label>										
                                    <input type="email" placeholder="" name="semail" v-model="shipping.semail" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="checkout-form-list">
                                    <label>Phone  </label>										
                                    <input type="text" placeholder="Phone" name="sphone" v-model="shipping.sphone" />
                                </div>
                            </div>								
                        </div>
                        <div class="order-notes">
                            <div class="checkout-form-list mrg-nn">
                                <label>Order Notes</label>
                                <textarea id="checkout-mess" cols="30" rows="10" name="notes" v-model="billing.notes" placeholder="Notes about your order, e.g. special notes for delivery." ></textarea>
                            </div>									
                        </div>
                    </div>													
                </div>
            
        </div>	
        <div class="col-lg-6 col-md-12 col-12">
            <div class="your-order">
                <h3>Your order</h3>
                <div class="your-order-table table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th class="product-name">Product</th>
                                <th class="product-total">Total</th>
                            </tr>							
                        </thead>
                        <tbody>
                            <tr class="cart_item" v-for="cartProduct in cartObj.cart">
                                <td class="product-name">
                                    {{ cartProduct.product_name }} <strong class="product-quantity"> × {{ cartProduct.product_quantity }}</strong>
                                </td>
                                <td class="product-total">
                                    <span class="amount">&#2547; {{ cartObj.getProductPriceByQuantity(cartProduct.product_id) }}</span>
                                </td>
                            </tr>
                            
                        </tbody>
                        <tfoot>
                            <tr class="cart-subtotal">
                                <th>Cart Subtotal</th>
                                <td><span class="amount">&#2547; {{ cartObj.calculateSubTotalInCart() }}</span></td>
                            </tr>
                            <tr class="cart-subtotal">
                                <th>Discount</th>
                                <td><span class="amount">&#2547; {{ cartObj.discount }}</span></td>
                            </tr>
                            <tr class="cart-subtotal">
                                <th>Shipping</th>
                                <td><span class="amount">&#2547; {{ cartObj.shipping_cost }}</span></td>
                            </tr>
                            <tr class="order-total">
                                <th>Order Total</th>
                                <td><strong><span class="amount">&#2547; {{ cartObj.calculateTotalInCart( cartObj.discount, cartObj.shipping_cost ) }}</span></strong>
                                </td>
                            </tr>								
                        </tfoot>
                    </table>
                </div>
                <div class="payment-method">
                    <h3>Payment Method</h3>
                    <div class="payment-accordion">
                        <div class="panel-group" id="faq">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h5 class="panel-title"><input type="radio" class="collapsed"  data-toggle="collapse" aria-expanded="false" data-parent="#faq" data-target="#payment-1" name="payment_mode" v-model="paymentMode.payment_mode" value="bank"> Direct Bank Transfer</h5>
                                </div>
                                <div id="payment-1" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <p>Bank payment is under procesing. We will add it as soon as it becomes activated.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h5 class="panel-title"><input type="radio" class="collapsed" data-toggle="collapse" aria-expanded="true" data-parent="#faq" data-target="#payment-2" name="payment_mode" v-model="paymentMode.payment_mode" value="bkash" checked> Mobile Payment</h5>
                                </div>
                                <div id="payment-2" class="panel-collapse collapse show">
                                    <div class="panel-body">
                                        <p><img src="/images/icon/bkash.png" alt="Bkash" title="Bkash" /></p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    
                                    <h5 class="panel-title"><input type="radio" class="collapsed" aria-expanded="false" data-parent="#faq" data-toggle="collapse" data-target="#payment-3" name="payment_mode" v-model="paymentMode.payment_mode" value="COD"> Cash on Delivery</h5>
                                </div>
                                <div id="payment-3" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <p><img src="/images/icon/cod.png" alt="Cash on Delivery" title="Cash on Delivery" /></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="order-button-payment">
                            <input type="submit" value="Place order"  />
                        </div>								
                    </div>
                </div>
            </div>
        </div>
    </div>
</form> 
</template>    

<script setup>
import { cartStore } from '@/store/cart.js';
import {ref, onMounted} from 'vue';
import axios from "axios";

let user_name = ref('');
let address = ref('');
let isVisible = ref(false);

const cartObj = cartStore();

let billing = {
    country: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    address2: "",
    city: "",
    phone: "",
    email: "",
    zip: "",
    username: "",
    password: "",
    is_create_account: "",
    userId: decodeURIComponent(document.cookie.split('user_id=')[1].split(';')[0].replace(/%20/g, " ")),
    ship_diff: "",
    notes: ""
};

let shipping = {
    sfirstName: "",
    slastName: "",
    scompany: "",
    saddress: "",
    saddress2: "",
    scity: "",
    sphone: "",
    semail: "",
    szip: "",
};


//console.log(cart_info);

let paymentMode = {
    payment_mode: "bkash"
};

const sendOrderFormData = async() =>{
    let cart_info = sessionStorage.getItem('cart');
    console.log(cart_info);
    return await axios.post('/api/submitOrder', {
    params: {
        billing: billing,
        shipping: shipping,
        paymentMode: paymentMode,
        cart_info: cart_info
    }
    })
        .then(async (res) => {
            if(res.data.message == "Success"){
                // return await axios.post('/api/sendInvoiceToEmail', {
                // params: {
                //     billing: billing,
                //     shipping: shipping,
                //     paymentMode: paymentMode,
                //     cart_info: cart_info
                // }
                // })
                // .then((res) => {
                alert("Order placed successfully!");
                sessionStorage.clear();
                window.location.href = "/thankyou?order_id=" + res.data.order_id;
                //})
            }
            else{
                alert("Order failed! Please try again.");
            }
            console.log(res.data); 
        })
        .catch((err) => console.log(err) )
   
}


onMounted(() => {
if (document.cookie.indexOf('user_fullname') > -1  ){
    user_name.value = document.cookie.split('user_fullname=')[1].split(';')[0].replace(/%20/g, " ");
    address.value = decodeURIComponent(document.cookie.split('user_address=')[1].split(';')[0].replace(/%20/g, " "));
}

});

</script>
