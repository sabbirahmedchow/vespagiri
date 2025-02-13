<template>
    <div class="row">
        <div class="col-lg-8 col-md-12 col-12" v-for="news_detail in news_detail">
            <div class="post_details_inner">
                <div class="single_post_thumbnail">
                    <img :src="'/img/blog/' + news_detail.bigimage" :alt="news_detail.title">
                </div>
                <div class="single_post_content">
                    <div class="single_post_top_contnt">
                        <div class="single_post_title">
                            <h2>{{news_detail.title}}</h2>
                        </div>
                        <div class="single_post_meta">
                            <div class="single_post_left_meta">
                                <ul>
                                    <li>{{new Date(news_detail.newsdate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}}</li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>

                    <div class="post_excerpt">
                        <p>{{news_detail.description}} </p>
                    </div>
                </div>

                
            </div>
        </div>
        <div class="col-lg-4 col-md-8 col-12">
            <div class="sidebar_right">
                
                <div class="sidebar_widget recent_post mb-65">
                    <div class="sidebar_title">
                        <h3>Recent Posts</h3>
                    </div>
                    <div class="single_recent_post">
                        <div class="recent_post_img">
                            <a href="#"><img src="/img/blog/latest_1.jpg" alt=""></a>
                        </div>
                        <div class="post_content">
                            <h3><a href="#">Anxiety disorder affects human life </a></h3>
                            <span class="post_publist_date">March 3, 2018</span>
                        </div>
                    </div>
                    <div class="single_recent_post">
                        <div class="recent_post_img">
                            <a href="#"><img src="/img/blog/latest_2.jpg" alt=""></a>
                        </div>
                        <div class="post_content">
                            <h3><a href="#">Anxiety disorder affects human life</a></h3>
                            <span class="post_publist_date">March 3, 2018</span>
                        </div>
                    </div>
                    <div class="single_recent_post">
                        <div class="recent_post_img">
                            <a href="#"><img src="/img/blog/latest_3.jpg" alt=""></a>
                        </div>
                        <div class="post_content">
                            <h3><a href="#">Anxiety disorder affects human life</a></h3>
                            <span class="post_publist_date">March 3, 2018</span>
                        </div>
                    </div>
                </div> 
                
        </div>
    </div>
</div>
</template>

<script setup>

import axios from "axios";
import { onMounted, ref} from "vue";
import { useRoute } from 'vue-router';
const router = useRoute();
let news_url = ref('');
news_url.value = router.params.title;
let news_detail = ref([]);
    

const getNewsDetail = async (news_url='') => {

    return await axios.get('/api/getNewsDetail', {
    params: {
        news_url: news_url
    }
    })
    .then((res) => {
        console.log(res.data);
        news_detail.value = res.data;
    })
    .catch((err) => console.log(err));

};

onMounted(() => {
    getNewsDetail(news_url.value);
    
});
</script>