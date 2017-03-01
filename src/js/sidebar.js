
// var isMenuOpenGlobal=false;


$(document)
  .ready(function() {


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
		menuToggle.addEventListener('click', toggleMenuWrapper);

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

  toggleMenuWrapper = function toggleMenu() {
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





});// End ready
