<template>
    <div class="slider_wrapper" >
        <div class="slider-active owl-carousel">
            <!--Single Slide-->
            <div class="single__slider bg-opacity" style="background-image:url(/img/slide/2.jpg)">
                <div class="container">
                    <div class="row align-items-center" v-for="r in randomizeBanner">
                        <div class="col-lg-6 col-md-6">
                            <div class="slider-content slider-text-animation">
                                <h2>{{r.title}}</h2>
                                <h1>{{r.subtitle}}</h1>
                                <p>{{r.text}} </p>
                                <router-link to="/shop" onclick="pageReload()">{{r.link}}</router-link>									
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <div class="slider_layer_image">
                                <img :src="r.image" alt="">
                            </div>
                        </div>
                    </div>	
                </div>
            </div>
            <!--Single slide end--> 
                
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, onActivated } from 'vue';

let bannerContent = ref([]);

bannerContent = [
    {
        title: 'Vespagiri.com',
        subtitle: 'Offers On',
        text: 'Spare Parts Purchase.',
        image: "/img/slide/layer_img_3.png",
        link: 'Visit Shop'
    },
    {
        title: 'Vespagiri.com',
        subtitle: 'Offers On',
        text: 'Engine Overhauling.',
        image: "/img/slide/vespa-2.png",
        link: 'Visit Shop'
    },
    {
        title: 'Vespagiri.com',
        subtitle: 'Offers On',
        text: 'Exterior Modification.',
        image: "/img/slide/vespa-3.png",
        link: 'Visit Shop'
    }
]
let randomizeBanner = reactive([]);
const randBannerSelect = async () =>{
    const rand = await Math.floor(Math.random() * bannerContent.length);
    randomizeBanner.push({...bannerContent[rand]});
    return randomizeBanner;
    
}

onMounted(() => {
    randBannerSelect();
});
onActivated(() => {
   
});

</script>