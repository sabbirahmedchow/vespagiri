<template>
    <div class="header_bottom">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-12">
                    <div class="menu d-none d-lg-block ">
                        <nav>
                            <ul>                                                  
                                <li><router-link to="/" onclick="test()">HOME</router-link></li>
                                <li><router-link to="/about">About</router-link></li>
                                <li><router-link to="/shop" onclick="test()">Shop</router-link></li>
                                <li><router-link to="/news">News</router-link></li>
                                <li><router-link to="/contact">CONTACT </router-link></li>
                                <li class="mega_item"><a href="#">My Account</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="col-lg-4 col-12">
                    <div class="header_right_info">
                        <ul>
                            <li><a href="wishlist.html">Register</a></li>
                            <li> <a href="login.html">Login</a></li>							                    
                        </ul>
                    </div>
                </div>
                <div class="col-12 d-lg-none">
                    <!--Mobile menu murkup start-->
                    <div class="mobile-menu-area d-lg-none">
                        <div class="mobile-menu clearfix">
                            <nav>
                                <ul>                                                  
                                    <li><a href="index.html">HOME </a></li>
                                    <li><a href="about-us.html">About</a></li>
                                    <li><a href="shop.html">Shop</a></li>
                                    <li><a href="blog.html">Blog</a></li>
                                    <li><a href="contact-us.html">CONTACT </a></li>
                                    <li ><a href="#">My Account</a></li>
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