$(function() {
    "use strict";
   

    /*--------
    jQuery MeanMenu
    ------------------ */
    
   $('.mobile-menu nav').meanmenu({
      meanMenuContainer: '.mobile-menu-area',
      meanScreenWidth: "991",
      meanRevealPosition: "right",
   });

    /* Hero slider active */
    $('.slider-active').owlCarousel({
        loop: false,
        nav: true,
        dots: true,
        autoplay: false,
        checkVisibility: false,
        lazyLoad: false,
        items: 1,
    });
    
    /* Single Product Carousel*/
    $('.single-product-active').owlCarousel({
        loop: true,
        nav: true,
        dots: true,
        autoplay: false,
        autoplayTimeout: 5000,
        navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        items: 4,
        margin: 10,
        responsive:{
            0:{
                items:2,
            }, 
            480:{
                items:3,
            },
            768:{
                items:4,
            }
        }
    });
    
    //Best Seller prod 
    $('.best_seller_product_carousel').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        autoplay: false,
        autoplayTimeout: 5000,
        items: 1,
        responsive:{
            0:{
                items:1,
            }, 
            768:{
                items:2,
            },
            992:{
                items:1,
            },
            1199:{
                items:1,
            }
        }
    });
    //Best Seller prod 
    $('.carousel_product').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        autoplay: false,
        autoplayTimeout: 5000,
        items: 3,
        responsive:{
            0:{
                items:1,
            }, 
            768:{
                items:2,
            },
            992:{
                items:3,
            },
            1199:{
                items:3,
            }
        }
    });
    
    /* --Related Product Carousel--*/
    $('.related_product_guttters').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        autoplay: false,
        autoplayTimeout: 5000,
        items: 4,
        responsive:{
            0:{
                items:1,
            }, 
            768:{
                items:2,
            },
            992:{
                items:3,
            },
            1199:{
                items:4,
            }
        }
    });
   
    /* --Testimonial Carousel--*/
    $('.testimonial_list').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        autoplay: false,
        autoplayTimeout: 5000,
        items: 1,
    });  
    
    /* --Testimonial Carousel--*/
    $('.brand_carousel_active').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        autoplay: false,
        autoplayTimeout: 5000,
        items: 5,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            }, 
            480:{
                items:2,
            },
            768:{
                items:3,
            },
            992:{
                items:4,
            },
            1199:{
                items:5,
            }
        }
    });
   
    
    /*-----
       NiceSelect
    ------------------------*/
     $('.category_search_inner .select select,.nice-select').niceSelect();
    
    /*------ Wow Active ----*/
    new WOW().init();
    

    /*--------------------------
     ScrollUp
    ---------------------------- */
    $.scrollUp({
        scrollText: '<i class="ion-arrow-up-c"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });
    
    
    /*--
	   Price Range Slider
    ------------------------*/
    $('#price-range').slider({
       range: true,
       min: 0,
       max: 5000,
       values: [ 0, 0 ],
       slide: function( event, ui ) {
        $('#price-amount').val( '\u09F3 ' + ui.values[ 0 ] + ' TO \u09F3 ' + ui.values[ 1 ] );
        $("#minMaxVal").val(ui.values[ 0 ] + ", " + ui.values[ 1 ]) 
       }
      });
    $('#price-amount').val( '\u09F3 ' + $('#price-range').slider( 'values', 0 ) +
       ' TO \u09F3 ' + $('#price-range').slider('values', 1 ) ); 
       
  
       
    /*----------------------------
    	Cart Plus Minus Button
    ------------------------------ */
    $(".cart-plus-minus").prepend('<div class="dec qtybutton">-</div>');
    $(".cart-plus-minus").append('<div class="inc qtybutton">+</div>');
    $(".qtybutton").on("click", function() {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.text() == "+") {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $button.parent().find("input").val(newVal);
    });
    
    /*-------------------------------------------
    elevateZoom
    -------------------------------------------- */	
    $("#zoom1").elevateZoom({
        gallery:'gallery_01', 
        responsive : true,
        zoomType : 'inner',
        cursor: 'crosshair'
    });  
    
    /*------
      Counter Up
    -------------- */	
    $('.counter').counterUp({
        delay: 70,
        time: 5000
    });
     
    /*--- showlogin toggle function ----*/
    $('#showlogin').on('click', function() {
        $('#checkout-login').slideToggle(900);
    });
    
    /*--- showlogin toggle function ----*/
    $('#showcoupon').on('click', function() {
        $('#checkout_coupon').slideToggle(900);
    });
    
    /*--- showlogin toggle function ----*/
    $('#ship-box').on('click', function() {
        $('#ship-box-info').slideToggle(1000);
    });
    /*mini cart slideToggle*/
    $(".mini_cart_box_wrapper > a, .cart_btn").on("click", function() {
        $('.mini_cart_box').toggleClass('active');
    }); 
    



});