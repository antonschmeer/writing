$(document).ready(function(){
    // Hide Header on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 50;
    var navbarHeight = $('#cover').outerHeight();

    $(window).on('mousemove', function(e) {
        clearTimeout($(this).data('timer'));

        if (e.clientY < 100) {
            if(!$('#cover').hasClass('nav-down')){
                $(this).data('timer',
                    setTimeout(function() {
                        $('#cover').removeClass('nav-up').addClass('nav-down');
                    }, 20)
                );
            }
        }
    });

    $('#top').on('mouseleave', function() {
        $(this).slideUp();
    })

    $('.full-wrapper').scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = -($('.post').position().top - 10);
        
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;
        
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('#cover').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up            
            if((lastScrollTop - st > 160) || (st < 15)) {
                $('#cover').removeClass('nav-up').addClass('nav-down');
            }
        }
        
        lastScrollTop = st;
    }
});