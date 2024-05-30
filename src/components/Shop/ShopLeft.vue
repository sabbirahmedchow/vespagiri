<template>
    <div class="col-lg-3 col-md-8 col-12">
        <div class="shop_sidebar">
           
            <div class="sidebar_widget mb-50">
                <div class="widget_title">
                    <h3>Categories</h3>
                </div>
                <div class="widget_categories">
                   <ul>
                        <li v-for="category in categories_list" >
                            <router-link to="/shop" @click="sendCategoryId(category._doc._id, category._doc.name)">{{ category._doc.name}}<span class="caet_count"> ({{ category.numProdInCat }})</span></router-link>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="sidebar_widget mb-50">
                <div class="widget_title">
                    <h3>Brands</h3>
                </div>
                <div class="widget_brand">
                <ul>
                        
                    <li v-for="brand in brand_list" >
                        <router-link to="/shop" @click="sendBrandId(brand._doc._id, brand._doc.name)">{{ brand._doc.name}}</router-link>
                    </li>
                </ul>
                </div>
            </div>
            
                                
            <div class="sidebar_widget mb-50">
                <div class="widget_title">
                    <h3>Price</h3>
                </div>
                <div class="widget_price">
                    <div class="sidebar-price">
                        <div id="price-range" v-on:mouseup="sendPriceRange()"></div>
                        <input type="text" id="price-amount" readonly>
                        <input type="hidden" id="minMaxVal">
                    </div>
                </div>
            </div>      
                                 
            
            
        </div>
    </div>
</template>
<script setup>
 import { ref, onMounted } from 'vue';
 import axios from "axios";
 import { inject } from 'vue'
 
    const e = inject('emitter');
    const categories_list = ref([]);
    const brand_list = ref([]);
   
    const getCategories = async () => {
        return await axios.get('/api/getAllCategories')
        .then((res1) => categories_list.value = res1.data)
        .catch((err) => console.log(err));
    };

    const getBrands = async () => {
        return await axios.get('/api/getAllBrands')
        .then((res2) => brand_list.value = res2.data)
        .catch((err) => console.log(err));
    };

    const sendCategoryId = (cat_id, cat_name) => {
        e.emit('category-id', {'category_id': cat_id, 'category_name': cat_name})
    };

    const sendBrandId = (brand_id, brand_name) => {
        e.emit('brand-id', {'brand_id': brand_id, 'brand_name': brand_name})
    };

    const sendPriceRange = () =>{
        let range = document.getElementById("minMaxVal").value
        e.emit('price-range', {'price_range': range})
    };

   
    onMounted(() => {
        getCategories();
        getBrands();
    });
</script>