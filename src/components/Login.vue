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
                            <li>Login</li>
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
                        <form action="#">
                            <div class="login_input">
                                <label>Full Name <span>*</span></label>
                                <input type="text" name="full_name" required>
                            </div>
                            <div class="login_input">
                                <label>Mobile No. <span>*</span></label>
                                <input type="text" name="mobile" required>
                            </div>
                            <div class="login_input">
                                <label>Email address <span>*</span></label>
                                <input type="text" name="email" required>
                            </div>
                            <div class="login_input">
                                <label>Username <span>*</span></label>
                                <input type="text" name="username" required>
                            </div>
                            <div class="login_input">
                                <label>Password <span>*</span></label>
                                <input type="password" name="password" required>
                            </div>
                            <div class="login_input">
                                <label>Confirm Password <span>*</span></label>
                                <input type="password" name="conf_password" required>
                            </div>

                            <div class="login_submit">
                                <button type="submit">Register</button>
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
                            <form action="#">
                                <div class="login_input">
                                    <label>Username <span>*</span></label>
                                    <input type="text">
                                </div>
                                <div class="login_input">
                                    <label>Passwords  <span>*</span></label>
                                    <input type="password">
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