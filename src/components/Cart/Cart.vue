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
                            <tr>
                                <td class="pro-thumbnail"><a href="#"><img src="/img/product/pro_sm_1.png" alt="" /></a></td>
                                <td class="pro-title"><a href="#">Le Parc Minotti Chair</a></td>
                                <td class="pro-price"><span class="amount">$169.00</span></td>
                                <td class="pro-quantity"><div class="product-quantity"><input type="number" value="1" /></div></td>
                                <td class="pro-subtotal">$169.00</td>
                                <td class="pro-remove"><a href="#">×</a></td>
                            </tr>
                            <tr>
                                <td class="pro-thumbnail"><a href="#"><img src="/img/product/pro_sm_2.png" alt="" /></a></td>
                                <td class="pro-title"><a href="#">DSR Eiffel chair</a></td>
                                <td class="pro-price"><span class="amount">$137.00</span></td>
                                <td class="pro-quantity"><div class="product-quantity"><input type="number" value="1" /></div></td>
                                <td class="pro-subtotal">$137.00</td>
                                <td class="pro-remove"><a href="#">×</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-8 col-12">
                <div class="cart-buttons mb-30">
                    <input type="submit" value="Update Cart" />
                    <a href="#">Continue Shopping</a>
                </div>
                <div class="cart-coupon mb-40">
                    <h4>Coupon</h4>
                    <p>Enter your coupon code if you have one.</p>
                    <div class="coupon_form_inner">
                        <input type="text" placeholder="Coupon code" />
                        <input type="submit" value="Apply Coupon" />
                    </div>
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
                                    <td><span class="amount">$306.00</span></td>
                                </tr>
                                <tr class="order-total">
                                    <th>Total</th>
                                    <td>
                                        <strong><span class="amount">$306.00</span></strong>
                                    </td>
                                </tr>											
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="proceed-to-checkout section mt-30">
                        <router-link to="/checkout">Proceed to Checkout</router-link>
                    </div>
                </div>
            </div>
            
            
        </div>
    </div>
</template>