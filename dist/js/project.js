// OWL call

$(document).ready(function(){
  $("#experts-slider").owlCarousel({

        items: 4,
        loop: true,
        checkVisibility: true,
        stagePadding: 0,


        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true,
        nav:true,
       

        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        freeDrag: false,

        margin: 0,
        stagePadding: 0,
        smartSpeed: 1000,

        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:2,
                nav:false
            },
            1000:{
                items:4,
                nav:true,
                loop:true
            }
        },
       slideTransition: ''
  });
});

$(document).ready(function(){
  $("#testemonials-slider").owlCarousel({

        items: 1,
        loop: true,
        // checkVisibility: true,

        autoplay:true,
        autoplayTimeout:4000,
        autoplayHoverPause:true,
        nav: false,
        slideTransition: 'fadeOut',
       

        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        freeDrag: false,

        singleItem: true,

        animateOut: 'fadeOut',
        // animateIn: 'flipInX',
        
        margin:30,
        stagePadding:30,
        smartSpeed: 150

      


    

  });
});