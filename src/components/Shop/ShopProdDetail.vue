<template>
  <div v-for="product in products">  
    <div class="row">
        <!--Product Tab Style start-->
        <div class="col-md-12 col-lg-5 col-12">
            <div class="product-details-img-content">
                <div class="product-details-tab">
                    <div id="img-1" class="zoomWrapper single-zoom">
                        <a href="#">
                            <img id="ll" :src="'/img/product/pro_details/' + product.image_big" :data-zoom-image="'/img/product/pro_details/'+ product.image_big" :alt="product.name">
                        </a>
                    </div>
                    
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
                            <input type="number" min="1" value="1" name="qtybutton" class="cart-plus-minus-box">
                        </div>
                        <div class="add_to_cart_btn">
                            <a href="#">add to cart</a>
                        </div>
                        <div class="wishlist">
                            <a href="#"><i class="zmdi zmdi-favorite-outline"></i></a>
                        </div>
                    </div>
                    <br/>
                    <div class="product-share">
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
                    </div>
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
        <div class="row related_product_guttters owl-carousel mt-60">
            <div class="col-lg-3"  v-for="rel_product in related_products">
                <div class="single__product">
                    <div class="produc_thumb">
                        <a href="#"><img :src="'/img/product/product_medium/' + rel_product.productImage" :alt="rel_product.productName"></a>
                    </div>
                    <div class="product_hover">
                        <div class="product_action">
                            <a href="#" title="Add To Cart"><i class="zmdi zmdi-shopping-cart-plus"></i></a>
                            <a href="#" title="Wishlist"><i class="zmdi zmdi-favorite-outline"></i></a>
                            <a href="#" title="Compare"><i class="zmdi zmdi-refresh-alt"></i></a>
                        </div>
                        <div class="product__desc">
                            <h3><a href="product-details.html">{{rel_product.productName}}</a></h3>
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
const router = useRoute();
let product_title = ref('');
product_title.value = router.params.name;
let products = ref([]);
let related_products = ref([]);
let loaded = ref(false);     

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

onMounted(() => {
    if(related_products.value !== null) {
        loaded.value = true;
    }
    getProductDetail(product_title.value);
    
});
</script>