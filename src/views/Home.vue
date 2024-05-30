<script setup>
import { shallowRef } from 'vue';

 import HomeBanner from "@/components/Home/HomeBanner.vue"
 import HomeOverview from "@/components/Home/HomeOverview.vue"
 import HomeFeatured from "@/components/Home/HomeFeatured.vue"
 import HomeBlog from "@/components/Home/HomeBlog.vue"
 const current = shallowRef(HomeBanner)
</script>

<template>
  <KeepAlive>
    <component :is="current" :key="UniqueIdentifier" />
  </KeepAlive>
   
  <HomeOverview />
  <HomeFeatured />
  <HomeBlog /> 
</template>