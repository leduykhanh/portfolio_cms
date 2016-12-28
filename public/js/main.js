jQuery(document).ready(function($){
	var contentSections = $('.cd-section'),
		navigationItems = $('#cd-vertical-nav a');

	updateNavigation();
	$(window).on('scroll', function(){
		updateNavigation();
	});

	//smooth scroll to the section
	navigationItems.on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });
    //smooth scroll to second section
    $('.cd-scroll-down').on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    //open-close navigation on touch devices
    $('.touch .cd-nav-trigger').on('click', function(){
    	$('.touch #cd-vertical-nav').toggleClass('open');

    });
    //close navigation on touch devices when selectin an elemnt from the list
    $('.touch #cd-vertical-nav a').on('click', function(){
    	$('.touch #cd-vertical-nav').removeClass('open');
    });

	function updateNavigation() {
			var header = $("#header");
			  if ($(window).scrollTop() > 50) {
				header.addClass("top-header");
			  } else {
				header.removeClass("top-header");
			  }
		contentSections.each(function(){
			$this = $(this);
			var activeSection = $('#cd-vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
			if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
				navigationItems.eq(activeSection).addClass('is-selected');
			}else {
				navigationItems.eq(activeSection).removeClass('is-selected');
			}
		});
	}

	function smoothScroll(target) {
        $('body,html').animate(
        	{'scrollTop':target.offset().top},
        	600
        );
	}

    $('[data-toggle="tooltip"]').tooltip();  
    $('.portfolio').hover(function(){
        $(this).stop().animate({top:'-10px'},{queue:false,duration:300});
		$(".description",this).stop().animate({height:'200px',paddingTop:"30px",opacity:0.8},{queue:false,duration:500});
		
    }, function() {
        $(this).stop().animate({top:'0px'},{queue:false,duration:300});
		$(".description",this).stop().animate({height:'0px',paddingTop:"0px",opacity:0},{queue:false,duration:500});
    }); 

});
