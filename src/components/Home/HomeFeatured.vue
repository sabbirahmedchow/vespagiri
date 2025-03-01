<template>
    <div class="hot_details_product pt-110 pb-107">
        <div class="container">
            <div class="row align-items-end">
                <div class="col-lg-3 col-md-3 col-12">
                    <div class="section_title">
                        <h2>Featured Products</h2>
                    </div>
                </div>
                
            </div>
            <div class="row mt-60">
                <div class="col-lg-9 col-md-12 ">
                    <div class="tab-content">
                        <div class="tab-pane active show fade" id="hot_all" role="tabpanel">
                            <div class="row">
                                <div class="col-lg-4 col-md-6" v-for="product in featured_products">
                                    <div class="single__product">
                                        <div class="produc_thumb">
                                            <a :href="'product-detail/'+  product.url_title">
                                                <img :src="'/img/product/product_medium/' + product.image_medium" :alt="product.name">
                                            </a>
                                        </div>
                                        <div class="product_hover">
                                            <div class="product_action">
                                                <a href="#" title="Add To Cart" @click="addToCart(product)"><i class="zmdi zmdi-shopping-cart-plus"></i></a>
                                                <a href="#" @click.prevent="add_to_wishlist(product._id)" title="Wishlist" v-if="show_wishlist_icon"><i class="zmdi zmdi-favorite-outline"></i></a>
                                            </div>
                                            <div class="product__desc">
                                                <h3><a :href="'product-detail/'+  product.url_title" >{{product.name}}</a></h3>
                                                <div class="price_amount">
                                                    <span class="current_price">&#2547; {{parseFloat(product.price).toFixed(2)}} </span>&nbsp;
                                                <span class="discount_price" v-if="product.sale_percentage != null">-{{product.sale_percentage}}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                        </div>
                    </div>
                
                <div class="col-lg-3 col-md-12">
                    <div class="single_banner long_hot_detals d-lg-none">
                        <a href="#"><img src="/img/banner/banner_tab_1.jpg" alt="Shop Banner"></a>
                    </div>
                    <div class="single_banner long_hot_detals d-none d-lg-block">
                        <a href="#"><img src="/img/banner/4.jpg" alt="Shop Banner"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import axios from "axios";
import { onMounted, ref} from "vue";
import { cartStore } from '@/store/cart.js';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const cartObj = cartStore();

let featured_products = ref([]);
let show_wishlist_icon = ref(false);
const products = ref([]);

const getFeaturedProducts = async () => {

    return await axios.get('/api/getFeaturedProducts', {
    })
    .then((res) => {
        
        //console.log(url_title);
        featured_products.value = res.data
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
            console.log(res.data);
            
            if(res.data.checkExists != "" && res.data != "Success"){
                alert(res.data.checkExists);
                return false;
            }
            else if(res.data == "Success"){
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
    if (document.cookie.indexOf('user_fullname') > -1  ) {
        
        show_wishlist_icon.value = true;
    }
    getFeaturedProducts();

});
</script>