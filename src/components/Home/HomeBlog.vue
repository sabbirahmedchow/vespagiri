<template>
    <div class="latest_post pb-70">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section_title">
                        <h2>Latest News</h2>
                    </div>
                </div>
            </div>
            <div class="row mt-60">
                <div class="col-lg-4 col-md-6" v-for="news in latest_news.slice(0,3)">
                    <div class="single_blog_post mb-40">
                        <div class="post_thumbnail">
                            <a :href="'/news-detail/'+ news.news_url"><img :src="'/img/blog/'+ news.smallimage" :alt="news.title"></a>
                        </div>
                        <div class="post_content_meta">
                            <div class="post_meta">
                                <ul>            
                                    <li>Posted {{new Date(news.newsdate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}}</li>
                                </ul>
                            </div>
                            <div class="blog_post_desc">
                                <h2><a :href="'/news-detail/'+ news.news_url">{{news.title}}</a></h2>
                                <p>{{excerpt(news.description, 100)}}...</p>
                            </div>
                            <div class="read_more_btn">
                                <a :href="'/news-detail/'+ news.news_url">Read More <span><i class="zmdi zmdi-arrow-right"></i></span></a>
                            </div>
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

const latest_news = ref([]);

const getAllNews = async () => {
    return await axios.get("/api/getAllNews")
        .then((response) => {
            latest_news.value = response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

const excerpt = (value, length) => {
  return value.length > length ? value.substring(0, length) : value
}

onMounted(() => {
    getAllNews()
});
</script>