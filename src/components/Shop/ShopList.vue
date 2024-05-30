<template>
   <div class="col-lg-9 col-md-12 col-12 shop_details">
        
        <div class="row">
            <div class="col-12">
                <div class="tab-content">
                    <div class="tab-pane active show fade" id="grid_view" role="tabpanel">
                        <div id="loadProd"></div> 
                        <div class="row">

                            <div class="col-lg-4 col-md-6 col-12" v-for="product in displayedComments">
                                <div class="single__product">
                                    <span class="pro_badge" v-if="product.is_sale">Sale</span>
                                    <div class="produc_thumb">
                                        <a href="#"><img :src="'/img/product/product_big/' + product.image_big" :alt="product.name"></a>
                                    </div>
                                    <div class="product_hover">
                                        <div class="product_action">
                                            <a href="#" title="Add To Cart"><i class="zmdi zmdi-shopping-cart-plus"></i></a>
                                            <a href="#" title="Wishlist"><i class="zmdi zmdi-favorite-outline"></i></a>
                                            
                                        </div>
                                        <div class="product__desc">
                                            <h3><a href="product-details.html">{{product.name}}</a></h3>
                                            <div class="price_amount">
                                                <span class="current_price">&#2547; {{parseFloat(product.price).toFixed(2)}} </span>
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
        </div>
        
        
        <div class="row pagination_box mt-70">
            <div class="col-12 paginate-position">
                
        <vue-awesome-paginate
        :total-items="products.length"
        :items-per-page="perPage"
        :max-pages-shown="5"
        paginate-buttons-class="btn"
        active-page-class="btn-active"
        back-button-class="back-btn"
        next-button-class="next-btn"
        v-model="currentPage"
        prev-button-content="Prev"
        next-button-content="Next"
      />
               
            </div>
        </div> 
    </div>
</template>

<style>
  .paginate-position{
    margin: 10px;
    text-align: center;
    width: 100%;
  }
  .btn {
    height: 40px;
    width: 40px;
    border: none;
    margin-inline: 5px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }
  .btn:hover {
    background-color: #F6563C;
  }
  .back-btn {
    width: 80px;
    background-color: #eeeeee;
  }
  .back-btn:hover {
    background-color: #F6563C;
  }
  .next-btn {
    width: 80px;
    background-color: #eeeeee;
  }
  .next-btn:hover {
    background-color: #F6563C;
  }
  .btn-active {
    background-color: #F6563C;
    color: white;
  }
</style>
<script setup>
import { ref, computed, onMounted, inject } from 'vue';
import axios from "axios";
 
const e = inject('emitter');

const perPage = ref(6);
const currentPage = ref(1);
const products = ref([]);

e.on('category-id', (evt) => {
    let cat_id = evt.category_id;
    getProducts(cat_id)
})

e.on('brand-id', (evt) => {
    let brand_id = evt.brand_id;
    getProducts('',brand_id,'')
})

e.on('price-range', (evt) => {
    let price_range = evt.price_range;
    price_range = price_range.split(",");
    getProducts('','',price_range)
})

const onClickHandler = (page) => {
  console.log(page);
};



const getProducts = async (cat_id = '', brand_id = '', price_range='') => {

    //if categorywise product is to be shown
    
    if(cat_id != ''){
        return await axios.get('/api/getProductsByCategory', {
    params: {
        categoryId: cat_id
    }
    })
        .then((res) => products.value = res.data)
        .catch((err) => console.log(err));
    }

    //if brandwise product is to be shown
    else if(brand_id != ''){
        return await axios.get('/api/getProductsByBrand', {
    params: {
        brandId: brand_id
    }
    })
        .then((res) => products.value = res.data)
        .catch((err) => console.log(err));
    }

    //if products need to be shown within a price range.
    else if(price_range != ''){
        
        return await axios.get('/api/getProductsByRange', {
    params: {
        low: price_range[0],
        high: price_range[1]
    }
    })
        .then((res) => products.value = res.data)
        .catch((err) => console.log(err));
    }

    //Show all product
    else
    {
        return await axios.get('/api/getAllProducts')
        .then((res) => products.value = res.data)
        .catch((err) => console.log(err));
    }
   
};

const displayedComments = computed(() => {
  const startIndex = (currentPage.value * perPage.value) - perPage.value;
  const endIndex = startIndex + perPage.value;
  return products.value.slice(startIndex, endIndex);
});
onMounted(() => {
    getProducts();
    
});
    
</script>