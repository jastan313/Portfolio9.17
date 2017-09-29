/*-----------------------------------------------------------------------------------
 /*
 /* Init JS
 /*
 -----------------------------------------------------------------------------------*/

jQuery(document).ready(function ($) {
    /*----------------------------------------------------*/
    /* FitText Settings
     ------------------------------------------------------ */
    setTimeout(function () {
        $('h1.responsive-headline').fitText(1, {minFontSize: '40px', maxFontSize: '90px'});
    }, 100);

    /*----------------------------------------------------*/
    /* Smooth Scrolling
     ------------------------------------------------------ */

    $('.smoothscroll').on('click', function (e) {
        e.preventDefault();
        var target = this.hash,
                $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function () {
            window.location.hash = target;
        });
    });
    
    /*----------------------------------------------------*/
    /* Highlight the current section in the navigation bar
     ------------------------------------------------------*/

    var sections = $("section");
    var navigation_links = $("#nav-wrap a");
    sections.waypoint({
        handler: function (event, direction) {
            var active_section;
            active_section = $(this);
            if (direction === "up")
                active_section = active_section.prev();
            var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');
            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");
        },
        offset: '35%'
    });


    /*----------------------------------------------------*/
    /*	Make sure that #header-background-image height is
     /* equal to the browser height.
     ------------------------------------------------------ */

    $('header').css({'height': $(window).height()});
    $(window).on('resize', function () {
        $('header').css({'height': $(window).height()});
        $('body').css({'width': $(window).width()})
    });

    /*----------------------------------------------------*/
    /*	Fade In/Out Primary Navigation
     ------------------------------------------------------*/

    $(window).on('scroll', function () {
        var h = $('header').height();
        var y = $(window).scrollTop();
        var nav = $('#nav-wrap');
        if ((y > h * .20) && (y < h) && ($(window).outerWidth() > 768)) {
            nav.fadeOut('fast');
        } else {
            if (y < h * .20) {
                nav.removeClass('opaque').fadeIn('fast');
            } else {
                nav.addClass('opaque').fadeIn('fast');
            }
        }

    });

    /*----------------------------------------------------*/
    /*	Modal Popup
     ------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        removalDelay: 200,
        showCloseBtn: false,
        mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    /*----------------------------------------------------*/
    /*	Flexslider
     /*----------------------------------------------------*/
    $('.flexslider').flexslider({
        namespace: "flex-",
        controlsContainer: ".flex-container",
        animation: 'slide',
        controlNav: true,
        directionNav: false,
        smoothHeight: true,
        slideshowSpeed: 7000,
        animationSpeed: 600,
        randomize: false,
    });
    
    /* Validation Functions */
    function validateName(name) {
        $('#message').hide();
        if (name.length === 0) {
            return 'Name is required.';
        }
        if (!name.match(/^[A-Za-z]*\s[A-Za-z]+$/)) {
            return 'Name: Please enter your first and last name.';
        }
        return '';
    }

    function validateEmail(email) {
        $('#message').hide();
        if (email.length === 0) {
            return 'Email is required.';
        }
        if (!email.match(/^[A-Za-z\._\-0-9]+[@][A-Za-z]+[\.][a-z]{2,4}$/)) {
            return 'Email: Please enter a valid email.';
        }
        return '';
    }


    function validateSubject(subject) {
        $('#message').hide();
        var required = 10;
        var left = required - subject.length;
        if (left > 0) {
            return 'Subject: ' + left + ' more characters required.';
        }
        return '';
    }

    function validateMessage(message) {
        $('#message').hide();
        var required = 30;
        var left = required - message.length;
        if (left > 0) {
            return 'Message: ' + left + ' more characters required.';
        }
        return '';
    }

    /*----------------------------------------------------*/
    /*	contact form
     ------------------------------------------------------*/
    $('form#contactForm button.submit').click(function () {
        $('#image-loader').fadeIn();
        var contactName = $('#contactForm #contactName').val();
        var contactEmail = $('#contactForm #contactEmail').val();
        var contactSubject = $('#contactForm #contactSubject').val();
        var contactMessage = $('#contactForm #contactMessage').val();

        var result = validateName(contactName);
        if (result.length === 0) {
            result = validateEmail(contactEmail);
            if (result.length === 0) {
                result = validateSubject(contactSubject);
                if (result.length === 0) {
                    result = validateMessage(contactMessage);
                }
            }
        }

        if (result.length === 0) {
            var data = 'Contact Name: ' + contactName + '\nEmail: ' + contactEmail +
             '\nSubject: ' + contactSubject + '\nBody: ' + contactMessage;
             $.ajax({
             type: "POST",
             url: "https://formspree.io/jastan313@gmail.com",
             data: {message: data},
             dataType: "json"
             });
            $('#contactForm').fadeOut();
            $('#message-text').addClass('fa-check');
            $('#message-text').removeClass('fa-times');
            $('#message-text').html(' Your message was sent, thank you!');
            $('#message').css('color', '#11ABB0');
        } else {
            $('#message-text').removeClass('fa-check');
            $('#message-text').addClass('fa-times');
            $('#message-text').html(' ' + result);
            $('#message').css('color', '#B02D11');
        }
        $('#image-loader').fadeOut();
        $('#message').fadeIn();
        return false;
    });
});