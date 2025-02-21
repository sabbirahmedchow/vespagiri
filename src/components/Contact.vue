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
                            <li>Contact Us</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Breadcrumb section end-->
    
   <!--Contact us start-->
       <div class="contact-us pt-110 pb-100">
           <div class="container">
               <div class="row">
                   <div class="col-lg-6 col-md-12 col-12">
                       <div class="contact-us-desc">
                            <div class="get-in-touch">
                               <h3>get in touch</h3>
                               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sedoo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim aid minim veniam, quihhs nostrud exercitation.</p>
                            </div>
                            <div class="contact-social">
                                <a href="#"><i class="zmdi zmdi-facebook"></i></a>
                                <a href="#"><i class="zmdi zmdi-instagram"></i></a>
                                <a href="#"><i class="zmdi zmdi-rss"></i></a>
                                <a href="#"><i class="zmdi zmdi-twitter"></i></a>
                                <a href="#"><i class="zmdi zmdi-pinterest"></i></a>
                            </div>
                            <div class="contact-address">
                                <h3>address</h3>
                                <div class="contact-list">
                                    <div class="single-contact-list">
                                        <div class="contact-icon">
                                            <i class="zmdi zmdi-pin"></i>
                                        </div>
                                        <div class="conatct-desc">
                                            <p>Your address goes here.</p>
                                        </div>
                                    </div>
                                    <div class="single-contact-list">
                                        <div class="contact-icon">
                                            <i class="zmdi zmdi-phone"></i>
                                        </div>
                                        <div class="conatct-desc">
                                            <p>+660 256444 24857 <br> +660 256 24857</p>
                                        </div>
                                    </div>
                                    <div class="single-contact-list">
                                        <div class="contact-icon">
                                            <i class="zmdi zmdi-email"></i>
                                        </div>
                                        <div class="conatct-desc">
                                            <p>info@example.com <br> info@example.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       </div>
                   </div>
                   
                   <div class="contact-form-inner col-lg-6 col-md-12 col-12">
                    
                        <div class="contact-form-titile text-center">
                            <h3>Send Us a Message</h3>    
                        </div>
                        <span style='text-align:center; color: red; padding:0; margin: 0 auto;' v-if="loader"><img src='../../images/preloader.gif' width='50' alt='loading...'></span>
                        <p style='text-align:center; font-weight:bold; color: red;'>
                            {{ confirm_message }}</p>
                       <div class="contat_form_inner mt-60">
                            <form id="contactForm" action="#" @submit.prevent="sendContactMail()" method="post">
                                <div class="single-contact-form d-flex">
                                    <div class="contact-box">
                                        <input type="text" placeholder="Your Name *" name="name" v-model="contactFormData.name" required>
                                    </div>
                                    <div class="contact-box">
                                        <input type="text" placeholder="Phone" v-model="contactFormData.phone" name="phone">
                                    </div>
                                </div>
                                <div class="single-contact-form">
                                    <div class="contact-box subject">
                                        <input type="email" placeholder="Email*" v-model="contactFormData.sender" name="sender" required>
                                    </div>
                                </div>
                                <div class="single-contact-form">
                                    <div class="contact-box message">
                                        <textarea name="message" placeholder="Message*" v-model="contactFormData.message" required></textarea>
                                    </div>
                                </div>
                                <div class="contact-btn">
                                    <button type="submit">Send Message</button>
                                </div>

                                <p class="form-messege"></p>

                            </form>
                       </div>
                   </div>
                   
            </div>

        </div>
    </div>
       <!--Contact us end-->
</template>

<script setup>

import axios from "axios";
import {ref} from "vue";

let contactFormData = {
    name: "",
    phone: "",
    sender: "",
    message: ""
};
let confirm_message = ref("");
let loader = ref(false);

const sendContactMail = async () => {
loader.value = true;
return await axios.post('/api/send-contact-mail', contactFormData)
.then((res) => {
    loader.value = false;
    confirm_message.value = res.data.message;
    document.forms["contactForm"].reset();
})
.catch((err) => console.log(err));

};

</script>