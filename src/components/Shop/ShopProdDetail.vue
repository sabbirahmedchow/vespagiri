<template>
  <div v-for="product in products">  
    <div class="row">
        <!--Product Tab Style start-->
        <div class="col-md-12 col-lg-5 col-12">
            <div class="product-details-img-content">
                <div class="product-details-tab">
                    <vue-image-zoomer :regular="'/img/product/pro_details/' + product.image_big" 
                    :zoom="'/img/product/pro_details/' + product.image_big"/>
                </div>
            </div>
        </div>
        <!--Product Tab Style End-->
        <div class="col-md-12 col-lg-7 col-12">
                <div class="product-details-content">
                    <h3>{{ product.name }}</h3>
                    
                    <div class="price_amount">
                        <span class="current_price">&#2547; {{parseFloat(product.price).toFixed(2)}} </span>&nbsp;
                        <span class="discount_price" v-if="product.sale_percentage != null">-{{product.sale_percentage}}%</span>
                    </div>
                    <p>{{ product.description}}</p>
                    
                    <div class="single_product_action d-flex align-items-center">
                        <div class="cart-plus-minus">
                            <input type="number" min="1" value="1" id="qty" name="qtybutton" class="cart-plus-minus-box">
                        </div>
                        <div class="add_to_cart_btn">
                            <a href="#" @click="addToCart(product)">add to cart</a>
                        </div>
                        <div class="wishlist" v-if="show_wishlist_icon">
                            <a href="#" @click.prevent="add_to_wishlist(product._id)" title="Wishlist"><i class="zmdi zmdi-favorite-outline"></i></a>
                        </div>
                    </div>
                    <br/>
                    <!-- <div class="product-share">
                        <div class="share_label">
                            <span>Share :</span>
                        </div>
                        <ul>
                            <li>
                                <a href="#">
                                    <i class="zmdi zmdi-facebook"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="zmdi zmdi-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="zmdi zmdi-google-plus"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="zmdi zmdi-pinterest"></i>
                                </a>
                            </li>
                        </ul>
                    </div> -->
                </div>
            </div>
    </div>
</div> 
    
     <!--Realted Product section start-->
    <div class="related_product_section mt-100">

        <div class="row">
            <div class="col-12">
                <div class="section_title">
                    <h2>Related Product</h2>
                </div>
            </div>
        </div>
        <div v-if="loaded">
        <div class="row related_product_guttters mt-60">
            <div class="col-lg-3" v-for="rel_product in related_products.slice(0,4)">
                <div class="single__product">
                    <div class="produc_thumb">
                        <a :href="rel_product.productUrl"><img :src="'/img/product/product_medium/' + rel_product.productImage" :alt="rel_product.productName"></a>
                    </div>
                    <div class="product_hover">
                        <div class="product__desc">
                            <h3><a :href="rel_product.productUrl">{{rel_product.productName}}</a></h3>
                            <div class="price_amount">
                                <span class="current_price">&#2547; {{parseFloat(rel_product.productPrice).toFixed(2)}} &nbsp; </span>
                                <span class="discount_price" v-if="rel_product.productSalePercentage != null">-{{rel_product.productSalePercentage}}%</span>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</div>

    <!--Realted Product section end-->
</template>
<script setup>

import axios from "axios";
import { onMounted, ref} from "vue";
import { useRoute } from 'vue-router';
import { cartStore } from '@/store/cart.js';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const cartObj = cartStore();

const router = useRoute();
let product_title = ref('');
product_title.value = router.params.name;
let products = ref([]);
let related_products = ref([]);
let loaded = ref(false);    
let show_wishlist_icon = ref(false); 

const getProductDetail = async (product_name='') => {

    return await axios.get('/api/getProductDetail', {
    params: {
        product_name: product_name
    }
    })
    .then((res) => {
        products.value = res.data;
        getRelatedProduct(res.data[0]._id);
    })
    .catch((err) => console.log(err));

};

const getRelatedProduct = async(product_id) =>{
    return await axios.get('/api/getRelatedProduct', {
    params: {
        product_id: product_id
    }
    })
    .then((res) => {
        console.log(res.data);
        related_products.value = res.data
    })
    .catch((err) => console.log(err));   
};

const addToCart = (product) =>{
   if(product.quantity == 0){
    alert("This product is out of stock for now.");
    return false;
   }
   
   if(cartObj.checkProductExistsOnCart(product._id))
   {
    let cartProduct = {
        product_id : product._id,
        product_name : product.name,
        product_price : product.price,
        product_image : product.image_small,
        product_quantity : document.getElementById('qty').value
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

const add_to_wishlist = async (prod_id) => {

let btn = confirm("Do you want to add this product to your wishlist?");
if(btn == true)
{
    let user_id = document.cookie.split(';').find(row => row.startsWith('user_id')).split('=')[1];
    return await axios.post('/api/addToWishlist', {
        params: {
        product_id: prod_id,
        user_id: user_id
    }
    })
    .then((res) => {
        if(res.data == "Success"){
            toast("Product added to wishlist!", {
                "theme": "auto",
                "type": "success",
                "dangerouslyHTMLString": true
            })
        }
    })
    .catch((err) => console.log(err));
}
}


onMounted(() => {
    if(related_products.value !== null) {
        loaded.value = true;
    }
    if (document.cookie.indexOf('user_fullname') > -1  ) {
        
        show_wishlist_icon.value = true;
    }
    getProductDetail(product_title.value);
    
});
</script>