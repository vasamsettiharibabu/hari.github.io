(function ($) {
    "use strict";
    //Navigation ===================================
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 100) {
            $('.main-navigation').addClass('test');
            $('.main-navigation>div').removeClass('container').addClass('container-fluid');
        } else {
            $('.main-navigation').removeClass('test');
            $('.main-navigation>div').addClass('container').removeClass('container-fluid');
        };
        
        //Menu Active on Scroll ===================================
        Scroll();
    });
    
    //Menubutton toggleClass ===================================
    $(".menuButton").on('click', function () {
        $(this).next('ul').slideToggle('slow');
        $(this).toggleClass('active');
    });
    
    //Menu Smoth Scroll ===================================
    $('.nav>li>a, .hire-me').on('click', function () {
        if ($(window).width() < 991)
        {
            
            $('html, body').animate({scrollTop: $(this.hash).offset().top - 70}, 1000);
            $(".main-menu ul").slideUp('slow');
            $(".menuButton").removeClass('active');
        }
        else
        {
            $('html, body').animate({scrollTop: $(this.hash).offset().top - 70}, 1000);
        }
        return false;
    });
    
    // User define function ===================================
    function Scroll() {
        var contentTop = [];
        var contentBottom = [];
        var winTop = $(window).scrollTop();
        var rangeTop = 200;
        var rangeBottom = 500;
        $('.main-menu').find('.nav>li>a').each(function () {
            var atr = $(this).attr('href');
            if ($(atr).length > 0)
            {
                contentTop.push($($(this).attr('href')).offset().top);
                contentBottom.push($($(this).attr('href')).offset().top + $($(this).attr('href')).height());
            }
        });
        $.each(contentTop, function (i) {
            if (winTop > contentTop[i] - rangeTop) {
                $('.main-menu ul.nav > li')
                .removeClass('active')
                .eq(i).addClass('active');
            }
        });
    };
    
    //Scroll Top ===================================
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 800) {
            $('.go-top').fadeIn().removeClass('no-visibility');
        } else {
            $('.go-top').fadeOut();
        }
    });
    
    $('.go-top').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 2000);
    });

    // Image Popup ===================================
    $('.image-popup').venobox({
        numeratio: true,           
        infinigall: true            
    });
    
     //form validation==================
    $('.sub-one').validate({
        errorClass: 'input-error',
        validClass: 'input-success',
        errorPlacement: function() {
            return true;
        },
        highlight: function(element, errorClass) {
            $(element).parents('.input').addClass(errorClass);
        },
        unhighlight: function(element, errorClass) {
            $(element).parents('.input').removeClass(errorClass);
        },
        rules: {
            email: {
                email: true
            }
        }
    });
    
    //form submit==================
    $('.sub-one').submit(function(e){
        e.preventDefault();
        var $form = $(this),
            $submit = $form.find('button.input-btn');
        if( $form.valid() ){
            var dataString = $form.serialize();
            $submit.after('<div class="loader"></div>');
            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: dataString,
                success: function() {
                    $submit.before('<div class="message message-success">Thank you someone will get back with you within 48 hours!</div>');
                },
                error: function() {
                    $submit.after('<div class="message message-error">Your message wasn\'t sent, please try again.</div>');
                },
                complete: function() {
                    $form.find('.loader').remove();
                    $form.find('.message').fadeIn();
                    setTimeout(function() {
                        $form.find('.message').fadeOut(function() {
                            $(this).remove();
                        });
                    }, 5000);
                }
            });
        }
    });

    // Google map ===================================
    var googleMapSelector = $('#contactgoogleMap'),
        myCenter = new google.maps.LatLng(40.789886, -74.056700);

    function initialize() {
        var mapProp = {
            center: myCenter,
            zoom: 15,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#444"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#333"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
            },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#eee"
            },
                        {
                            "visibility": "on"
                        }
                    ]
                }]
        };
        var map = new google.maps.Map(document.getElementById("contactgoogleMap"), mapProp);
        var marker = new google.maps.Marker({
            position: myCenter,
            animation: google.maps.Animation.BOUNCE,
            icon: 'img/location-pin.png'
        });
        marker.setMap(map);
    }
    if (googleMapSelector.length) {
        google.maps.event.addDomListener(window, 'load', initialize);
    } 
})(jQuery);