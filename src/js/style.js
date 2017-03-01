$(document)
  .ready(function() {


    // Vars
    var docWidth;
    var searchWrapperWidth;
    var isSearchOpen = false;
    var currentScreen;
    var tabletBreakpointShrinked;
    var columnSidebar = $('.posts-grid .column.sidebar');
    var columnSidebarPopular = $('.posts-grid .column.sidebar .posts-list');

    var rowMobileFilter = $('.posts-grid .sidebar-coupled.mobile');
    var rowMobilePopular = $('.posts-grid .sidebar-popular.mobile');

    var rowTablet = $('.posts-grid .sidebar-coupled.tablet');
    var rowDesktopSmallAndDesktop = $('.posts-grid .sidebar-coupled.desktopSmallAndDesktop');
    var rowDesktopLarge = $('.posts-grid .sidebar-coupled.desktopLarge');
    var rowRemainingPost = $('.posts-grid .row.remaining-post');
    var rowRemainingPostLastChild = $('.posts-grid .row.remaining-post .column:last-child');

    var cardSidebar = $('.posts-grid .card.sidebar');
    var popularList = $('.posts-grid .posts-list');

    var tagFilterDropdown = $('.tag-filter .ui.selection.fluid.dropdown');
    var commentRespondAccordion = $('.comment-respond-wrapper .ui.fluid.accordion');

    var resized;



    //Automatic fill-in (static content)
    var demoCard = '<div class="card security"><div class="infos"><a class="feature-img-link" href="#post-link" ><img src="../images/content/feature-thumbnail-xyx.jpg" srcset="../images/content/feature-thumbnail-xyx.jpg 1x, ../images/content/feature-thumbnail-xyx_@2x.jpg 2x" alt="xyz"></a><div class="description"><h2><a href="#post-link"><span>Le .XYZ en promo !</span></a></h2><div class="meta"><p><span class="date">23.12.2016</span>&nbsp;-&nbsp;<span class="time">13:37</span>,&nbsp;written by&nbsp;<span class="author"><a href="#">Gandi.net</a></span></p></div><div class="excerpt"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim</p></div></div></div><a href="#post-link"><button class="fluid ui right labeled icon button card-cta">Read More<i class="right icon icon-arrow-post"></i></button></a></div>'
    $.each( $('.posts-grid .column').not('.posts-grid .column.sidebar').not('.posts-grid .column.2slots'), function(){
      $(this).append(demoCard);
    });

    $.each( $('.posts-grid .column.2slots'), function(){
      for(var i = 0; i < 2; i++) {
        $(this).append(demoCard);
      }
    });





    $(function () {
        $('input').blur();
    });


    // Set current Screen
    enquire.register("screen and (max-width: 767px)", {match : function() {
      currentScreen = 'mobile';
      checkSizeBrowser();
    }});
    enquire.register("screen and (min-width: 768px) and (max-width: 991px)", {match : function() {
      tabletBreakpointShrinked = true;
      checkSizeBrowser();
    }});
    enquire.register("screen and (min-width: 768px) and (max-width: 991px)", {unmatch : function() {
      tabletBreakpointShrinked = false;
      checkSizeBrowser();
    }});
    enquire.register("screen and (min-width: 768px) and (max-width: 1023px)", {match : function() {
      currentScreen = 'tablet';
      checkSizeBrowser();
    }});
    enquire.register("screen and (min-width: 1024px) and (max-width: 1365px)", {match : function() {
      currentScreen = 'desktop-small';
      checkSizeBrowser();
    }});
    enquire.register("screen and (min-width: 1366px) and (max-width: 1919px)", {match : function() {
      currentScreen = 'desktop';
      checkSizeBrowser();
    }});
    enquire.register("screen and (min-width: 1366px) and (max-width: 1499px)", {match : function() {
      currentScreen = 'desktop-grid';
      checkSizeBrowser();
    }});
    enquire.register("screen and (min-width: 1500px) and (max-width: 1919px)", {match : function() {
      currentScreen = 'desktop-larger-grid';
      checkSizeBrowser();
    }});
    enquire.register("screen and (min-width: 1920px)", {match : function() {
      currentScreen = 'desktop-large';
      checkSizeBrowser();
    }});



    // Touch devices detection

    function setCtaInteraction(){
      $.each( $('.posts-grid .card-cta'), function(){
        $(this).addClass('hoverEffect');
      });
    }

    function isTouchDevice(){
        return typeof window.ontouchstart !== 'undefined';
    }

    if(isTouchDevice()==true){
      console.log(currentScreen);
      $('head').append('<link rel="stylesheet" type="text/css" href="../css/touch.css">');
      if(currentScreen =='mobile' || currentScreen =='tablet' || currentScreen =='desktop-small' ){
        //
      }
      $('.tag-filter .ui.dropdown .icon').removeClass('hoverEffect');
      $('.menu-toggle').removeClass('hoverEffect');
    }else{
      $.each( $('.ui.basic.inverted.button'), function(){
          $(this).addClass('hoverEffect');
        });
        setTimeout(setCtaInteraction, 300);
    }


    // Prepend class fonction
    function prependClass(sel, strClass) {
      var $el = jQuery(sel);
      var classes = $el.attr('class');
      classes = strClass +' ' +classes;
      $el.attr('class', classes);

    }

    // Checksize
    $(window).resize(checkSizeBrowser);


    function checkSizeBrowser(){

      // Close Sidebar while resizing
      if(isMenuOpenGlobal==true){
        clearTimeout(resized);
        resized = setTimeout(toggleMenu, 400);
      }

      // Update doc width
      docWidth = jQuery(window).width();

      // Search Form
      if(currentScreen!='mobile'){
        searchWrapperWidth = parseInt(docWidth-237);
        $("form.search-form input").attr("placeholder", "Type your search here and press enter to validate");
        if(isTouchDevice()!=true){
        $("form.search-form input").attr("placeholder", "Type your search here and press enter to validate").val("").focus().blur();
        }

      }else{
        searchWrapperWidth = docWidth;
        $("form.search-form input").attr("placeholder", "Type your search here");
        if(isTouchDevice()!=true){
          $("form.search-form input").attr("placeholder", "Type your search here").val("").focus().blur();
        }

      }

      // input size + logo display
      if(isSearchOpen){
        $('.search-wrapper form.search-form input').css('width',searchWrapperWidth);
        if(currentScreen=="mobile"){
          $('.menu-toggle, .logo').css('opacity', 0);
        }else{
          $('.menu-toggle, .logo').css('opacity', 1);
        }
      }


      // Tag-filter dropdown + comment respond accordion > set disable toggle areas width
      $('.tag-filter .ui.selection.fluid.dropdown .disableToggle').css('width', tagFilterDropdown.outerWidth());
      $('.tag-filter .ui.selection.fluid.dropdown .disableCheck').css('width', tagFilterDropdown.outerWidth()-48);
      $('.comment-respond-wrapper .ui.fluid.accordion .disableToggle').css('width', commentRespondAccordion.outerWidth()-54);


      // Posts-Grid setup
      if(currentScreen=='mobile'){

        rowMobileFilter.addClass('visible');
        rowMobilePopular.addClass('visible');

        rowTablet.removeClass('visible');
        rowDesktopSmallAndDesktop.removeClass('visible');
        rowDesktopLarge.removeClass('visible');

        rowRemainingPost.removeClass('two three four');

        rowRemainingPostLastChild.css('display','none');

        cardSidebar.detach().appendTo($('.sidebar-coupled.mobile > .column.sidebar'));
        popularList.detach().appendTo($('.sidebar-popular.mobile > .column.sidebar > .card.sidebar2'));

      }
      if(currentScreen=='tablet'){
        rowMobileFilter.removeClass('visible');
        rowMobilePopular.removeClass('visible');
        rowTablet.addClass('visible');
        rowDesktopSmallAndDesktop.removeClass('visible');
        rowDesktopLarge.removeClass('visible');

        rowRemainingPost.removeClass('two three four');
        prependClass(rowRemainingPost,'two');

        rowRemainingPostLastChild.css('display','none');

        cardSidebar.detach().appendTo($('.sidebar-coupled.tablet > .column.sidebar'));
        popularList.detach().appendTo($('.sidebar-coupled.tablet > .column.sidebar > .card.sidebar'));

      }
      if(currentScreen=='desktop-small' || currentScreen=='desktop-grid'){
        rowMobileFilter.removeClass('visible');
        rowMobilePopular.removeClass('visible');
        rowTablet.removeClass('visible');
        rowDesktopSmallAndDesktop.addClass('visible');
        rowDesktopLarge.removeClass('visible');

        rowRemainingPost.removeClass('two three four');
        prependClass(rowRemainingPost,'three');

        cardSidebar.detach().appendTo($('.sidebar-coupled.desktopSmallAndDesktop > .column.sidebar'));
        popularList.detach().appendTo($('.sidebar-coupled.desktopSmallAndDesktop > .column.sidebar > .card.sidebar'));

        rowRemainingPostLastChild.css('display','inline-block');
      }
      if(currentScreen=='desktop-larger-grid' || currentScreen=='desktop-large'){

        rowMobileFilter.removeClass('visible');
        rowMobilePopular.removeClass('visible');
        rowTablet.removeClass('visible');
        rowDesktopSmallAndDesktop.removeClass('visible');
        rowDesktopLarge.addClass('visible');

        rowRemainingPost.removeClass('two three four');
        prependClass(rowRemainingPost,'four');

        rowRemainingPostLastChild.css('display','none');

        cardSidebar.detach().appendTo($('.sidebar-coupled.desktopLarge > .column.sidebar'));
        popularList.detach().appendTo($('.sidebar-coupled.desktopLarge > .column.sidebar > .card.sidebar'));

      }

      // Dead-end pages
      if($('.dead-end').length > 0){

        if(currentScreen=='mobile' || tabletBreakpointShrinked==true){


            $('.dead-end .ui.grid .column.message').detach().appendTo('.dead-end .ui.grid');
            $('.dead-end .ui.grid .column.message a.exit button').addClass('fluid');
            $(".dead-end .ui.grid .column.illustration img").attr("src", "../images/content/illustration_dead-end_mobile.jpg");


        }else{
          $('.dead-end .ui.grid .column.message').detach().prependTo('.dead-end .ui.grid');
          $('.dead-end .ui.grid .column.message a.exit button').removeClass('fluid');
          $(".dead-end .ui.grid .column.illustration img").attr("src", "../images/content/illustration_dead-end.jpg");
        }
      }


    }//end CheckSize()

    setTimeout(checkSizeBrowser, 300);


    //Search form init
    if(isTouchDevice()==true){
      // No hover effect
    }else{
      $('.search-wrapper .form-toggle').hover(function(){
        $('.search-wrapper form.search-form input').toggleClass('visible');
      });
    }

    $('.search-wrapper .form-toggle').on('click',toggleInputSearchDisplay);


    function toggleInputSearchDisplay (){

      checkSizeBrowser();

      $('.search-wrapper .form-toggle').off( "mouseenter mouseleave" );


      //Search is not open yet > go visible
      if(!isSearchOpen){

        if(isTouchDevice()==true){
          $('.search-wrapper form.search-form input').toggleClass('visible');
        }

        $('.search-wrapper form.search-form input').addClass('open');
        if(currentScreen=="mobile"){
          $('.menu-toggle, .logo').velocity({ opacity : 0 }, { duration: 400, easing:"easeOutExpo", queue: false});
        }
        $('.search-wrapper form.search-form input').velocity({ width : searchWrapperWidth }, { duration: 400, easing:"easeOutExpo", queue: false});
        $('.search-wrapper .form-toggle .icon-search').velocity({ scaleX : 0, scaleY : 0 }, { duration: 400, easing:"easeOutExpo", queue: false});
        $('.search-wrapper .form-toggle .icon-close').velocity({ scaleX : 1.1 , scaleY : 1.1 }, { duration: 400, easing:"spring", queue: false});
        isSearchOpen = true;

      }else{
        //Search is opened > go close
        $('.search-wrapper form.search-form input').removeClass('open');


          if(isTouchDevice()==true){
            $('.search-wrapper form.search-form input').toggleClass('visible');
          }else{
            $('.search-wrapper .form-toggle').hover(function(){
              $('.search-wrapper form.search-form input').toggleClass('visible');
            });
          }


        $('.menu-toggle, .logo').velocity({ opacity : 1 }, { duration: 400, easing:"easeOutExpo", queue: false});
        $('.search-wrapper form.search-form input').velocity({ width : 60 }, { duration: 400, easing:"easeOutExpo", queue: false});
        $('.search-wrapper .form-toggle .icon-search').velocity({ scaleX : 1, scaleY : 1 }, { duration: 400, easing:"easeOutExpo", queue: false});
        $('.search-wrapper .form-toggle .icon-close').velocity({ scaleX : 0, scaleY : 0 }, { duration: 400, easing:"spring", queue: false});
        isSearchOpen = false;
      }
    }

    //Language Dropdown
    $('.language .ui.dropdown')
      .dropdown()
      .dropdown('set selected', 1)
      .dropdown('set value', 1)
      ;
    ;

    //Category Dropdown
    $('.category-selection .ui.dropdown')
      .dropdown();
    ;

    //Search Dropdown
    $('.search-selection .ui.dropdown')
      .dropdown()
      .dropdown('set selected', 1)
      .dropdown('set value', 1);
    ;

    //Filter Dropdown
    $('.tag-filter .ui.dropdown')
      .dropdown({
        action : 'nothing',
      });
    ;

    $('.tag-filter .ui.checkbox')
      .checkbox()
    ;



    $(".tag-filter .ui.dropdown .disableToggle, .tag-filter .ui.dropdown .default.text").click(function(e) {
       e.stopPropagation();
    });

    $(".tag-filter .ui.dropdown .disableCheck").hover(function(e) {
       e.stopPropagation();
    });

    $(".tag-filter .ui.dropdown .disableCheck").click(function(e) {
       e.stopPropagation();
    });




    //Comment-respond Dropdown form
    $('.comment-respond-wrapper .ui.dropdown')
      .dropdown({
        action : 'nothing',
      });
    ;

    $('.comment-respond-wrapper .ui.checkbox')
      .checkbox()
    ;

    $('.comment-respond-wrapper .ui.accordion')
      .accordion()
    ;

    // Icon arrow hover
    $('.comment-respond-wrapper .ui.fluid.accordion .title').hover(function(){
        $('.comment-respond-wrapper .ui.fluid.accordion .icon').css('background','#11AAAA').addClass('hover');
      }, function(){
        $(".comment-respond-wrapper .ui.fluid.accordion .icon").css('background','#ffffff').removeClass('hover');;
      });
    // Icon arrow reverse
    $('.comment-respond-wrapper .ui.fluid.accordion .title').click(function(){
        $(this).prev().toggleClass('active');
    });

    // Form display submit button
    var commentFormFields = $(".ui.form.comment-form :input").not('#url');
    commentFormFields.keyup(function() {
        // empty inputs
        var emptyFields = commentFormFields.filter(function() {

            return $.trim(this.value) === "";
        });

        if (!emptyFields.length) {
            console.log('tout est plein');
            $('.ui.form.comment-form .ui.submit.button').removeClass('disabled');
        } else {
            console.log('reste à remplir');
            $('.ui.form.comment-form .ui.submit.button').addClass('disabled');
        }
    });

    // Scroll to anchor
    $(function() {
      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 400 );
            return false;
          }
        }
      });
    });

    // Result box display
    if ($('.container.search').length > 0) {

      if (currentScreen != 'mobile' && $(".search-infos p span.search-return").text().length > 40 ){
        console.log('conditions reunies');
        $('.container.search .search-infos').removeClass('twelve wide').addClass('sixteen wide');
        $('.container.search .search-selection').removeClass('four wide').addClass('sixteen wide');

        $('.main .top-heading .ui.grid.container').css('height','auto');
        $('.main .top-heading').addClass('stacked');
        $('.container.search .search-infos').addClass('stacked');
      }

    }


// SIDEBAR

    var isMenuOpenGlobal;
    var toggleMenuWrapper;

	// 'use strict';

	var support = { transitions: Modernizr.csstransitions },
		// transition end event name
		transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		onEndTransition = function( callback ) {
			var onEndCallbackFn = function( ev ) {
				if( support.transitions ) {
				}
				if( callback && typeof callback === 'function' ) { callback.call(this); }
			};
			if( support.transitions ) {
				onEndCallbackFn();
			}
			else {
				onEndCallbackFn();
			}
		},

		current = 0,


		// menu button
		menuCtrl = document.querySelector('button.menu-button'),
    menuToggle = document.querySelector('.menu-toggle'),

		// check if menu is open
    isMenuOpenGlobal = false;





	function init() {
		initEvents();
	}


	// event binding
	function initEvents() {
		// menu button click
		menuToggle.addEventListener('click', toggleMenu);

		// keyboard navigation events
		document.addEventListener( 'keydown', function( ev ) {
			if( !isMenuOpenGlobal ) return;
			var keyCode = ev.keyCode || ev.which;
			if( keyCode === 27 ) {
				closeMenu();
			}
		} );
	}




	// Toggle Menu
  function toggleMenu() {
		if( isMenuOpenGlobal ) {
			closeMenu();
		}
		else {
			openMenu();
      isMenuOpenGlobal = true;
		}
	}

// End toggle menu


	// opens
	function openMenu() {
    console.log('openMenu');
		classie.add(menuCtrl, 'menu-button--open');
    $('.ui.sidebar')
    .sidebar({
      dimPage : false,
      useLegacy : false,
      closable : false
          }
      )
    .sidebar('toggle');

	}


	// close
	function closeMenu() {
		classie.remove(menuCtrl, 'menu-button--open');
    $('.ui.sidebar').sidebar('toggle');

		onEndTransition(function() {
      isMenuOpenGlobal = false;
		});
	}

	init();


});//End document ready
