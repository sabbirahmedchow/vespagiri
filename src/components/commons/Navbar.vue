<template>
    <div class="header_bottom">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-12">
                    <div class="menu d-none d-lg-block ">
                        <nav>
                            <ul>                                                  
                                <li><router-link to="/" onclick="pageReload()">HOME</router-link></li>
                                <li><router-link to="/about">About</router-link></li>
                                <li><router-link to="/shop" onclick="pageReload()">Shop</router-link></li>
                                <li><router-link to="/news">News</router-link></li>
                                <li><router-link to="/contact">CONTACT </router-link></li>
                                <li class="mega_item" v-if="isCookieSet"><router-link to="/my-account">My Account</router-link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="col-lg-4 col-12">
                    <div class="header_right_info">
                        <ul v-if="!isCookieSet">
                            <li><router-link to="/register">Register</router-link></li>
                            <li> <router-link to="/login">Login</router-link></li>							                    
                        </ul>
                        <ul v-else>
                            <li><router-link to="#">Welcome, {{user_fullname}}</router-link> </li>
                            <li> <router-link to="" @click="logout()">Logout</router-link></li>							                    
                        </ul>
                    </div>
                </div>
                <div class="col-12 d-lg-none">
                    <!--Mobile menu murkup start-->
                    <div class="mobile-menu-area d-lg-none">
                        <div class="mobile-menu clearfix">
                            <nav>
                                <ul>                                                  
                                    <li><router-link to="/" onclick="pageReload()">HOME </router-link></li>
                                    <li><router-link to="/about">About</router-link></li>
                                    <li><router-link to="/shop" onclick="pageReload()">Shop</router-link></li>
                                    <li><router-link to="/news">News</router-link></li>
                                    <li><router-link to="/contact">CONTACT </router-link></li>
                                    <li class="mega_item" v-if="isCookieSet"><router-link to="/my-account">My Account</router-link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <!--Mobile menu murkup End-->
                </div>
            </div>
        </div>
    </div>
</template>    
<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";

let isCookieSet = ref(false);
let user_fullname = ref('');

async function logout(){
    return await axios.post('/api/logout')
    .then((res) =>{
        alert(res.data);
        location.href= window.location.origin;
    })
    .catch((err) => console.log(err));
}

onMounted(() => {
    if (document.cookie.indexOf('user_fullname') > -1  ) {
        isCookieSet.value = true;
        user_fullname.value = document.cookie.split('user_fullname=')[1].split(';')[0].replace(/%20/g, " ");
    }
    
});
</script>