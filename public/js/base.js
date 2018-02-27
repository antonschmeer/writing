// This setup is called an IIFE, or an
// "Immediately Invoked Function Expression"
// It is a replacement for the "$(document).ready()"
(function($, window, document, undefined){
	// List of tags & IDs to make the markup more flexible
	var ledeVideoContainer = "video-container";
	var ledeVideoID = "video-media";
	var ledeVideoSpanID = "spanbkg";

	// Plugin targets 
	var footnotesTarget = ".body sup";
	var jumpLinksTarget = "a.jump-link";

	var isMobile = function(){ return $(window).width() < 900 };

	// front page big letters on link hover with movement
	$('#main-menu-front h3').on('mouseenter', function(){
		$('#front-big-word h1').text($(this).text());
	});
	$('#main-menu-front h3').on('mouseleave', function(){	
		$('#front-big-word h1').empty();
	});

	// front page big letters on link hover with movement
	// $('#main-menu-front h3').on('mouseenter', function(){
	// 	$('#front-big-word h1').text($(this).text());
	// 	var ls = -80;
	// 	setInterval(function(){
	// 		$('#front-big-word h1').css('letter-spacing', (ls + 'px'));
	// 		ls = ls + -.01;
	// 	}, 0)
	// });
	// $('#main-menu-front h3').on('mouseleave', function(){
	// 	$('#front-big-word h1').css('letter-spacing', '-80px');
	// 	$('#front-big-word h1').empty();
	// });

	// $('#main-menu-front .big-title').on('click', function(){
	// 	window.location.href = "https://antonschmeer.github.io/writing";
	// });

	// Just a quick function to let you 
	// manage the order of operations
	function init(){
		
		navToggle();
		//setFootnotes(footnotesTarget);
	};

	// navigation overlay toggle
	function navToggle(){

		// variables:
		var $body   = $("body"),
		$cMenu      = $("#overthetop"),
		$menuParent = $($cMenu.parent()),
		$openLinks  = $("#navigate, #menu a"),
		$closeLink  = $("#overthetop a.close"),
		$articleCloseLink = $('header#cover p a.close'),
		mobileView,
		winTop;
		$openLinks.click(function(e){
			e.preventDefault();
			$cMenu.fadeToggle(500,"linear");
			$menuParent.toggleClass("takeaseat");
			$articleCloseLink.toggleClass("unclickable");
			mobileView = isMobile();
			if ( mobileView ) {
				$cMenu.addClass("ultra");
			}
			winTop = $(window).scrollTop();

			if($(window).width() > 768){
				$('.top-link').css({'visibility':'hidden', 'pointer-events':'none'});				
			}		

			/*// Lock scroll 
			$cMenu.bind('touchstart scroll mousewheel touchmove', function (ev) {
				if ($(this).scrollTop() === 0) $(this).scrollTop(1);
				var $menu     = $("#overthetop"),
				scrollTop     = $menu.scrollTop(),
				scrollHeight  = $menu.scrollHeight,
				offsetHeight  = $menu.offsetHeight,
				contentHeight = scrollHeight - offsetHeight;
				if (contentHeight == scrollTop) $(this).scrollTop(scrollTop-1);
				ev.stopPropagation();
			});*/
		});
		
		$closeLink.click(function(e){
			e.preventDefault();
			if ( mobileView ) { $(window).scrollTop(winTop) };
			$cMenu.fadeToggle(250,"linear");
			$menuParent.removeClass("takeaseat");
			$articleCloseLink.removeClass("unclickable");
		
			// Unlock scroll 
			// $cMenu.unbind('touchstart scroll mousewheel touchmove');

			$('.top-link').css({'visibility':'visible', 'pointer-events':'auto'});
		});
		
		// escape to close overlay
		$(document).keyup(function(e) { 
			// variables:
			var $cMenu = $("#overthetop"),
			$menuParent = $($cMenu.parent());
			if (e.keyCode == 27) { 
				$cMenu.fadeOut(500,"linear");
				$menuParent.removeClass("takeaseat");
				$articleCloseLink.removeClass("unclickable");
			} 

			$('.top-link').css({'visibility':'visible', 'pointer-events':'auto'});
		});
	};


	// ------------------ //
	// ---- PLUGINS ----- //
	// ------------------ //

	function setJumpLinks(target){
		//   Just pick a link and a target add (optionally) a variable to adjust speed 
		$(target).jumper({
			transition: 800 // this can either be removed or adjusted 
		});
	};


	function setFootnotes(target){
	 
		var vid = document.getElementById(ledeVideoID) || null;

		if (vid) return;

		onFontLoad(target);
	};
	
	//   jQuery Font-Spy Check 
	function onFontLoad(target){
		$('.post-header h1, .body p').fontSpy({
			onLoad: 'font-loaded',
			onFail: 'font-fail',
			callback: setNotes(target)
		});
	};

	function setNotes(target){
		//   The number of markers should match the number of columns
		//   The notes should live inside a container
		$(target).footprint({
			notes:     ".footnotes li",
			container: ".footnotes",
			threshold: 900
		});
	};

	// eliminate the 300ms click delay on mobile browsers https://github.com/ftlabs/fastclick
	$(function() {
	    FastClick.attach(document.body);
	});

	//smooth-scrollbar
	var setScrollbar = function(){
		scrollbar = Scrollbar.init(document.getElementById('full-wrapper'), {
			speed: 1.0,
			damping: 0.1,
			overscrollDamping: 0.2,
			thumbMinSize: 20,
			renderByPixels: true,
			alwaysShowTracks: false,
			continuousScrolling: 'auto',
			overscrollEffect: 'bounce',
			overscrollEffectColor: '#000'
		});
	};

	if($(window).width() >= 1025){
		setScrollbar();	
	}
	else{
		$('.full-wrapper').css({'overflow-y':'scroll', '-webkit-overflow-scrolling':'touch', 'overflow-x':'hidden'});
	}

	window.onresize = function(event) {
	    if($(window).width() < 1025 && Scrollbar.has(document.getElementById('full-wrapper'))){
	    	scrollbar.destroy();
	    	$('.full-wrapper').css({'overflow-y':'scroll', '-webkit-overflow-scrolling':'touch', 'overflow-x':'hidden'});
	    }
	    if($(window).width() >= 1025 && !(Scrollbar.has(document.getElementById('full-wrapper')))){
	    	setScrollbar();
	    }
	};

	init();
	
}(jQuery, this, document));