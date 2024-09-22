<template>
    <div class="row">
        <div class="col-lg-6 col-md-12 col-12">
            <form action="#">
                <div class="checkbox-form">						
                    <h3>Billing Details</h3>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="country-select">
                                <label>Country <span class="required">*</span></label>
                                <select>
                                  <option value="BD">Bangladesh</option>
                                  
                                </select> 										
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="checkout-form-list">
                                <label>First Name <span class="required">*</span></label>										
                                <input type="text" placeholder="" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="checkout-form-list">
                                <label>Last Name <span class="required">*</span></label>										
                                <input type="text" placeholder="" />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="checkout-form-list">
                                <label>Company Name</label>
                                <input type="text" placeholder="" />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="checkout-form-list">
                                <label>Address <span class="required">*</span></label>
                                <input type="text" placeholder="Street address" />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="checkout-form-list">									
                                <input type="text" placeholder="Apartment, suite, unit etc. (optional)" />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="country-select">
                                <label>Division / City <span class="required">*</span></label>
                                <select>
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
                                <input type="text" placeholder="" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="checkout-form-list">
                                <label>Postcode / Zip <span class="required">*</span></label>										
                                <input type="text" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="checkout-form-list">
                                <label>Email Address <span class="required">*</span></label>										
                                <input type="email" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="checkout-form-list">
                                <label>Password  <span class="required">*</span></label>										
                                <input type="password" />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="checkout-form-list create-acc">	
                                <input id="cbox" type="checkbox" />
                                <label for="cbox">Create an account?</label>
                            </div>
                            <div id="cbox_info" class="checkout-form-list create-account">
                                <p>Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                                <label>Account password  <span class="required">*</span></label>
                                <input type="password" placeholder="password" />	
                            </div>
                        </div>								
                    </div>
                    <div class="different-address">
                        <div class="ship-different-title">
                            <h3>
                                <label for="ship-box">Ship to a different address?</label>
                                <input id="ship-box" type="checkbox" />
                            </h3>
                        </div>
                        <div id="ship-box-info">
                            <div class="col-md-12">
                                <div class="country-select">
                                    <label>Country <span class="required">*</span></label>
                                    <select>
                                      <option value="BD">Bangladesh</option>
                                      
                                    </select> 										
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="checkout-form-list">
                                    <label>First Name <span class="required">*</span></label>										
                                    <input type="text" placeholder="" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="checkout-form-list">
                                    <label>Last Name <span class="required">*</span></label>										
                                    <input type="text" placeholder="" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="checkout-form-list">
                                    <label>Company Name</label>
                                    <input type="text" placeholder="" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="checkout-form-list">
                                    <label>Address <span class="required">*</span></label>
                                    <input type="text" placeholder="Street address" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="checkout-form-list">									
                                    <input type="text" placeholder="Apartment, suite, unit etc. (optional)" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="checkout-form-list">
                                    <label>Town / City <span class="required">*</span></label>
                                    <input type="text" placeholder="Town / City" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="checkout-form-list">
                                    <label>State / County <span class="required">*</span></label>										
                                    <input type="text" placeholder="" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="checkout-form-list">
                                    <label>Postcode / Zip <span class="required">*</span></label>										
                                    <input type="text" placeholder="Postcode / Zip" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="checkout-form-list">
                                    <label>Email Address <span class="required">*</span></label>										
                                    <input type="email" placeholder="" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="checkout-form-list">
                                    <label>Phone  <span class="required">*</span></label>										
                                    <input type="text" placeholder="Postcode / Zip" />
                                </div>
                            </div>								
                        </div>
                        <div class="order-notes">
                            <div class="checkout-form-list mrg-nn">
                                <label>Order Notes</label>
                                <textarea id="checkout-mess" cols="30" rows="10" placeholder="Notes about your order, e.g. special notes for delivery." ></textarea>
                            </div>									
                        </div>
                    </div>													
                </div>
            </form>
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
                                <td><span class="amount">&#2547; 0.00</span></td>
                            </tr>
                            <tr class="order-total">
                                <th>Order Total</th>
                                <td><strong><span class="amount">&#2547; {{ cartObj.calculateTotalInCart( cartObj.discount ) }}</span></strong>
                                </td>
                            </tr>								
                        </tfoot>
                    </table>
                </div>
                <div class="payment-method">
                    <div class="payment-accordion">
                        <div class="panel-group" id="faq">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h5 class="panel-title"><a data-toggle="collapse" aria-expanded="true" data-parent="#faq" href="#payment-1">Direct Bank Transfer.</a></h5>
                                </div>
                                <div id="payment-1" class="panel-collapse collapse show">
                                    <div class="panel-body">
                                        <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h5 class="panel-title"><a class="collapsed" data-toggle="collapse" aria-expanded="false" data-parent="#faq" href="#payment-2">Cheque Payment</a></h5>
                                </div>
                                <div id="payment-2" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h5 class="panel-title"><a class="collapsed" data-toggle="collapse" aria-expanded="false" data-parent="#faq" href="#payment-3">PayPal</a></h5>
                                </div>
                                <div id="payment-3" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="order-button-payment">
                            <input type="submit" value="Place order" />
                        </div>								
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>    

<script setup>
import { cartStore } from '@/store/cart.js'

const cartObj = cartStore();

</script>