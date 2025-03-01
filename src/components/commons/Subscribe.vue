<template>
    <div class="newsletter_section ptb-80">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-5 col-md-12">
                    <div class="newsletter_text">
                        <h2>Get All Updates</h2>
                        <p>Sign up our newsleter today. Also get allert for new product.</p>
                    </div>
                </div>
                <div class="col-lg-7 col-md-12">
                    <div class="newsletter_form">
                        <form action="#" @submit.prevent="subscribe">
                            <input type="email" placeholder="Type your email" v-model="sub_email" required>
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

let sub_email = ref('');

const subscribe = async () => {
    console.log(sub_email);
    const response = await axios.post('/api/addToNewsletter', { sub_email: sub_email.value });
    if(response.data.message){
    toast(`${response.data.message}`, {
                    "theme": "auto",
                    "type": "success",
                    "dangerouslyHTMLString": true
                })
    }
    else{
        toast(`${response.data.error}`, {
                    "theme": "auto",
                    "type": "error",
                    "dangerouslyHTMLString": true
                })
    }
    
}
</script>