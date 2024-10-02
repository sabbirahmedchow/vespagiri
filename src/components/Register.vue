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
                            <li>Register</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Breadcrumb section end-->
     <!-- accont area start -->
    <div class="account_area ptb-100">
        <div class="container">
            <div class="row">
               <!--register area start-->
               <div class="col-lg-6 col-md-12">
                <div class="login_title">
                    <h2>Register</h2>
                </div>
                <div class="login_form form_register ">
                    <form action="#" @submit.prevent="submitRegisterForm()">
                        <img v-if="isLoading === true" src="/images/loader.gif" width="80" alt="Loading" />
                        <p style='text-align:center; font-weight:bold; color: red;'>
                            {{ confirmRegistrationMsg }}
                        </p>
                        <div class="login_input">
                            <label>Full Name <span>*</span></label>
                            <input type="text" v-model="userData.full_name" required>
                        </div>
                        <div class="login_input">
                            <label>Mobile No. <span>*</span></label>
                            <input type="text" v-model="userData.mobile" required>
                        </div>
                        <div class="login_input">
                            <label>Address <span>*</span></label>
                            <input type="text" v-model="userData.address" required>
                        </div>
                        <div class="login_input">
                            <label>Email address <span>*</span></label>
                            <input type="email" v-model="userData.email" required>
                        </div>
                        <div class="login_input">
                            <label>Username <span>*</span></label>
                            <input type="text" v-model="userData.username" required>
                        </div>
                        <div class="login_input">
                            <label>Password <span>*</span></label>
                            <input type="password" v-model="userData.password" required>
                        </div>
                        <div class="login_input">
                            <label>Confirm Password <span>*</span></label>
                            <input type="password" v-model="userData.conf_password" required>
                            {{ passwordMessage }}
                        </div><br/>
                        <div class="login_input">
                            <label>Complete the following <span>*</span></label> <br/>
                            <span class="num">{{firstVal}} {{op}} {{secondVal}} :
                            <input type="number" v-model="captcha" class="txt" required> 
                            {{ captchaMessage }} 
                            </span>
                        </div>
                        <br/>
                        <div class="login_submit">
                            <button type="submit">Register</button>
                            <button type="reset">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            <!--register area end-->

            <!--login area start-->
            <div class="col-lg-6 col-md-12">
                <div class="account_form">
                    <div class="login_title">
                        <h2>login</h2>
                    </div>
                    <div class="login_form login">
                        <form action="#" @submit.prevent="submitLoginForm()">
                            <img v-if="isLoading === true" src="/images/loader.gif" width="80" alt="Loading" />
                            <p style='text-align:center; font-weight:bold; color: red;'>
                                {{ confirmLoginMsg }}
                            </p>
                            <div class="login_input">
                                <label>Username <span>*</span></label>
                                <input type="text" v-model="loginData.username" required>
                            </div>
                            <div class="login_input">
                                <label>Password  <span>*</span></label>
                                <input type="password" v-model="loginData.password" required>
                            </div>
                            <div class="login_submit">
                                <button type="submit">login</button>
                                <label for="remember">
                                    <input id="remember" type="checkbox">
                                    Remember me
                                </label>
                                <a href="#">Lost your password?</a>
                            </div>

                        </form>
                    </div>
                 </div>    
            </div>
            <!--login area start-->

            </div>
        </div>
    </div>
</template>
<style scoped>
.num{
    color: red;
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
    width:100%;
}
.txt{
    width:30%;
    font-size:20px;
}
input[type="number"]::-webkit-outer-spin-button, 
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"] {
    -moz-appearance: textfield;
}
</style>

<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";

let firstVal = ref(0);
let secondVal = ref(0);
let operator = ['+','*'];
let op = ref("");
let result = ref(0);
let captchaMessage = ref("");
let captcha = "";
let passwordMessage = ref("");
let confirmRegistrationMsg = ref("");
let confirmLoginMsg = ref("");
let isLoading = ref(false);

let userData = {
    full_name: "",
    mobile: "",
    address: "",
    email: "",
    username: "",
    password: "",
    conf_password: ""
};

let loginData = {
    username: "",
    password: ""
};

function randCaptchaValueCalc() {
    
    firstVal.value = Math.floor(Math.random() * 11);
    secondVal.value = Math.floor(Math.random() * 11);
    op = operator[Math.floor(Math.random() * operator.length)];
    if(op == '+')
    result = firstVal.value + secondVal.value;
    else
    result = firstVal.value * secondVal.value;
    
}

async function submitRegisterForm(){
        isLoading.value=true;
        passwordMessage.value = '';
        captchaMessage.value = '';

        if(this.userData.password != this.userData.conf_password){
            isLoading.value=false;
            passwordMessage.value = "Password and Confirm Password does not match";
            return false;
        }
        if(this.captcha != result){
            isLoading.value=false;
            captchaMessage.value = "Invalid Captcha";
            return false;
        }
        else{
            
            return await axios.post('/api/userRegistration', this.userData)
            .then((res) => {
                confirmRegistrationMsg.value = res.data; 
                this.userData.full_name = '';
                this.userData.mobile = '';
                this.userData.address = '';
                this.userData.email = ''; 
                this.userData.username = '';
                this.userData.password= '';
                this.userData.conf_password = '';
                this.captcha = '';
            })
            .catch((err) => console.log(err));
            
        }
    
}

async function submitLoginForm(){
    isLoading.value=true;
    return await axios.post('/api/userLogin', this.loginData)
    .then((res) =>{
        if(res.data[1] == 0)
        {
            isLoading.value=false;
            confirmLoginMsg.value = res.data[0];
            return false;
        }
        else{
            isLoading.value=false;
            confirmLoginMsg.value = res.data[0];
            location.href= window.location.origin;
        }
        
    })
    .catch((err) => console.log(err));
}


onMounted(() => {
    randCaptchaValueCalc();
   
});

</script>