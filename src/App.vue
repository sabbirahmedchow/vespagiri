<template>
  <header>
    <Header />
    <Navbar />
  </header>
      <router-view />
  <Subscribe />
  <Footer />
  
</template>

<script setup>
 import Header from "@/components/commons/Header.vue"
 import Navbar from "@/components/commons/Navbar.vue"
 
 import Subscribe from "@/components/commons/Subscribe.vue"
 import Footer from "@/components/commons/Footer.vue"

</script>