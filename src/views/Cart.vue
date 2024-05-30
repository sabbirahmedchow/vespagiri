<template>
    <CartHead title='Cart' />
    <div class="cart_page_area pt-100 pb-60">
        <form action="#">
            <Cart />
        </form>
    </div>            
</template>
<script setup>
import CartHead from "@/components/Cart/CartHead.vue"
import Cart from "@/components/Cart/Cart.vue"
</script>
