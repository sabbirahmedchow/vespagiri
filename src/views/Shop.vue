<template>
    <ShopHead title='Shop' />
    <div class="shop_area ptb-100">
        <div class="container">
            <div class="row">
                <ShopLeft />
                <ShopList />
                
                
            </div>
        </div>
    </div>            
</template>
<script setup>
import ShopHead from "@/components/Shop/ShopHead.vue"
import ShopLeft from "@/components/Shop/ShopLeft.vue"
import ShopList from "@/components/Shop/ShopList.vue"

 </script>
