<template>
    <!--Breadcrumb section-->
    <div class="breadcrumb_section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="breadcrumb_inner">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><i class="zmdi zmdi-chevron-right"></i></li>
                            <li>Search</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Breadcrumb section end-->
    
    <!--search section area start-->
    <div class="error_section ptb-100">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="error_form">
                        <table border="0" cellpadding="5" cellspacing="4">
                            <tr>
                                <td>
                                    <h2>Search Results</h2>
                                </td>
                            </tr>
                            <tr><td v-if="serchResults.length == 0"><h3>No result found.</h3></td></tr>
                            <tr v-for="(searcRes, index) in serchResults" :key="searcRes.id">
                                <td v-if="searcRes.name">
                                    <span>{{index+=1}} <a :href="'/product-detail/' + searcRes.url_title">{{ searcRes.name }}</a></span>
                                    <p>{{excerpt(searcRes.description, 100)}}...</p>
                                </td>
                                <td v-else>
                                    <span>{{index+=1}} <a :href="'/news-detail/' + searcRes.news_url">{{ searcRes.title }}</a></span>
                                    <p>{{excerpt(searcRes.description, 100)}}...</p>
                                </td>
                            </tr>    
                        </table>

                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--search secton end-->
</template>

<script setup>
import axios from "axios";
import { onMounted, ref} from "vue";
import { useRoute } from 'vue-router';

const router = useRoute();
let search_keyword = ref('');
search_keyword.value = router.query.qry;

let serchResults = ref([]);

const getSearchDetail = async (srchQry='') => {
    
    return await axios.get('/api/getSearchDetail', {
    params: {
        srchQry: srchQry
    }
    })
    .then((res) => {
        serchResults.value = res.data;
    })
    .catch((err) => console.log(err));
};

const excerpt = (value, length) => {
  return value.length > length ? value.substring(0, length) : value
};

onMounted(() => {
    getSearchDetail(search_keyword.value);
    
});
</script>

<style scoped>
table tr td{
    width: 100%;
    float: left;
    text-align: left;
    padding: 0;
}
table tr td span a{
    background: none;
    color: #666666;
    text-align: left;
    margin: 0;
    width: auto;
    font-size: 18px;
}
a:hover{
    background: none;
    color: #666666;
    text-decoration: underline;
}
p{
    color: #999999;
    font-size: 17px;
    width: 100%;
}
</style>   
