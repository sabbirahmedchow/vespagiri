<template>
   <div class="col-lg-9 col-md-12 col-12 shop_details">
        
        <div class="row">
            <div class="col-12">
                <div class="tab-content">
                    <div class="tab-pane active show fade" id="grid_view" role="tabpanel">
                        <div v-if="cat_name"><h3><b>Vespa {{cat_name}}</b></h3></div>
                        <div v-else-if="brand_name"><h3><b>{{brand_name}}</b></h3></div>    
                        <div v-else><h3><b>All Products</b></h3></div>   
                        <br/>

                        <div v-if="ShowProducts.length">
                        <div class="row">
                        
                            <div class="col-lg-4 col-md-6 col-12" v-for="product in ShowProducts">
                                <div class="single__product">
                                    <span class="pro_badge" v-if="product.is_sale">Sale</span>
                                    <div class="produc_thumb">
                                        <a :href="'product-detail/'+  product.url_title"><img :src="'/img/product/product_medium/' + product.image_medium" :alt="product.name"></a>
                                    </div>
                                    <div class="product_hover">
                                        <div class="product_action">
                                            <a href="#" title="Add To Cart" @click="addToCart(product)"><i class="zmdi zmdi-shopping-cart-plus"></i></a>
                                            <a href="#" @click.prevent="add_to_wishlist(product._id)" v-if="show_wishlist_icon" title="Wishlist"><i class="zmdi zmdi-favorite-outline"></i></a>
                                            
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
                        <div v-else>
                            <p><h4>No Product Found.</h4></p>
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
    color: #ffffff;
  }
  .back-btn {
    width: 80px;
    background-color: #eeeeee;
  }
  .back-btn:hover {
    background-color: #F6563C;
    color: #ffffff;
  }
  .next-btn {
    width: 80px;
    background-color: #eeeeee;
  }
  .next-btn:hover {
    background-color: #F6563C;
    color: #ffffff;
  }
  .btn-active {
    background-color: #F6563C;
    color: white;
  }
</style>

<script setup>
import { ref, computed, onMounted, inject } from 'vue';
import axios from "axios";
import { cartStore } from '@/store/cart.js'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const cartObj = cartStore();
 
const e = inject('emitter');
let cat_name;
let brand_name;

const perPage = ref(6);
const currentPage = ref(1);
const products = ref([]);
let show_wishlist_icon = ref(false); 

e.on('category-id', (evt) => {
    let cat_id = evt.category_id;
    cat_name = evt.category_name;
    brand_name = '';// make the brand title empty for category name to be shown.
    getProducts(cat_id,'','')
})

e.on('brand-id', (evt) => {
    let brand_id = evt.brand_id;
    brand_name = evt.brand_name;
    cat_name = ''; // make the category name empty for the brand name to be shown.
    getProducts('',brand_id,'')
})

e.on('price-range', (evt) => {
    let price_range = evt.price_range;
    price_range = price_range.split(",");
    brand_name = cat_name = '';
    getProducts('','',price_range)
})


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

//this computed property is to manage the pagination.
const ShowProducts = computed(() => {
  const startIndex = (currentPage.value * perPage.value) - perPage.value;
  const endIndex = startIndex + perPage.value;
  return products.value.slice(startIndex, endIndex);
});

 const addToCart = (product) =>{
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
};

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
    getProducts();
    
});
    
</script>