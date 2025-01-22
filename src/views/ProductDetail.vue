<template>
    <ShopHead title='Product Detail' :name=product_title />
    <div class="product_details_inner left_sidebar ptb-110">
        <div class="container">
            
            <ShopProdDetail />
             
        </div>
    </div>            
</template>
<script setup>
import { useRoute } from 'vue-router';
import {ref} from 'vue';
const router = useRoute();
let product_title = ref('');
product_title.value = router.params.name;
import ShopHead from "@/components/Shop/ShopHead.vue"
import ShopProdDetail from "@/components/Shop/ShopProdDetail.vue"
</script>
