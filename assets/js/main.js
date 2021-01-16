(function($) {
    "use strict";

    jQuery(document).on('ready', function() {
        /*-----------------------------
          Fixed Navigation
        -----------------------------*/
        if ($('header').offset().top > 50) {
            $('body').addClass('fixed-header');
        } else {
            $('body').removeClass('fixed-header');
        }
        /* Scroll Function */
        $(window).on('scroll', function() {
            /* Fixed Navigation */
            if ($('header').offset().top > 50) {
                $('body').addClass('fixed-header');
            } else {
                $('body').removeClass('fixed-header');
            }
        });

        /*-----------------------------
          hover Button (letter Effect)
        -----------------------------*/

        document.querySelectorAll('.effect-letter').forEach(button => {

            let div = document.createElement('div'),
                letters = button.textContent.trim().split('');

            function elements(letter, index, array) {

                let element = document.createElement('span'),
                    part = (index >= array.length / 2) ? -1 : 1,
                    position = (index >= array.length / 2) ? array.length / 2 - index + (array.length / 2 - 1) : index,
                    move = position / (array.length / 2),
                    rotate = 1 - move;

                element.innerHTML = !letter.trim() ? '&nbsp;' : letter;
                element.style.setProperty('--move', move);
                element.style.setProperty('--rotate', rotate);
                element.style.setProperty('--part', part);

                div.appendChild(element);

            }

            letters.forEach(elements);

            button.innerHTML = div.outerHTML;

            button.addEventListener('mouseenter', e => {
                if (!button.classList.contains('out')) {
                    button.classList.add('in');
                }
            });

            button.addEventListener('mouseleave', e => {
                if (button.classList.contains('in')) {
                    button.classList.add('out');
                    setTimeout(() => button.classList.remove('in', 'out'), 950);
                }
            });

        });

        /*-----------------------------
          Effect on Menu for Mobile
        -----------------------------*/
        document.querySelectorAll('.menu').forEach(btn => {
            btn.addEventListener('click', e => {
                btn.classList.toggle('active');
            });
        });

        /*-----------------------------
          Smooth Scrollspy to (For Navbar)
        -----------------------------*/

        // Add scrollspy to <body>
        $('body').scrollspy({ target: ".navbar", offset: 50 });

        // Add smooth scrolling on all links inside the navbar
        $("#myNavbar a").on('click', function(event) {
            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {
                // Prevent default anchor click behavior
                event.preventDefault();

                // Store hash
                var hash = this.hash;

                // Using jQuery's animate() method to add smooth page scroll
                // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 800, function() {

                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                });
            } // End if
        });


        /*-----------------------------
          Collapse - icon in Collapse
        -----------------------------*/
        $('.collapse').on('show.bs.collapse', function() {
            $(this).siblings('.card-header').addClass('active');
        });

        $('.collapse').on('hide.bs.collapse', function() {
            $(this).siblings('.card-header').removeClass('active');
        });

        /*-----------------------------
          Dropdown Select for Language
        -----------------------------*/
        $('select[data-menu]').each(function() {

            let select = $(this),
                options = select.find('option'),
                menu = $('<div />').addClass('select-menu'),
                button = $('<div />').addClass('button'),
                list = $('<ul />'),
                arrow = $('<em />').prependTo(button);

            options.each(function(i) {
                let option = $(this);
                list.append($('<li />').text(option.text()));
            });

            menu.css('--t', select.find(':selected').index() * -41 + 'px');

            select.wrap(menu);

            button.append(list).insertAfter(select);

            list.clone().insertAfter(button);

        });

        $(document).on('click', '.select-menu', function(e) {

            let menu = $(this);

            if (!menu.hasClass('open')) {
                menu.addClass('open');
            }

        });

        $(document).on('click', '.select-menu > ul > li', function(e) {

            let li = $(this),
                menu = li.parent().parent(),
                select = menu.children('select'),
                selected = select.find('option:selected'),
                index = li.index();

            menu.css('--t', index * -41 + 'px');
            selected.attr('selected', false);
            select.find('option').eq(index).attr('selected', true);

            menu.addClass(index > selected.index() ? 'tilt-down' : 'tilt-up');

            setTimeout(() => {
                menu.removeClass('open tilt-up tilt-down');
            }, 500);

        });

        $(document).on('click', e => {
            e.stopPropagation();
            if ($('.select-menu').has(e.target).length === 0) {
                $('.select-menu').removeClass('open');
            }
        });

        /*-----------------------------
          Hide and Show Password
        -----------------------------*/
        $("#show_hide_password").on('click', 'a', function(event) {
            event.preventDefault();
            if ($('#show_hide_password input').attr("type") == "text") {
                $('#show_hide_password input').attr('type', 'password');
                $('#show_hide_password .hide_show span').addClass("hidden_outlined");
                $('#show_hide_password .hide_show span').removeClass("visible_outlined");
            } else if ($('#show_hide_password input').attr("type") == "password") {
                $('#show_hide_password input').attr('type', 'text');
                $('#show_hide_password .hide_show span').removeClass("hidden_outlined");
                $('#show_hide_password .hide_show span').addClass("visible_outlined");
            }
        });


        /*-----------------------------
          loading before open page
        -----------------------------*/
        // Fakes the loading setting a timeout
        setTimeout(function() {
            $('body').addClass('loaded_page');
        }, 3000);

        /*-----------------------------
          Back to top with progress indicator
        -----------------------------*/
        var progressPath = document.querySelector('.prgoress_indicator path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function() {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).on('scroll', updateProgress);
        var offset = 250;
        var duration = 550;
        jQuery(window).on('scroll', function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.prgoress_indicator').addClass('active-progress');
            } else {
                jQuery('.prgoress_indicator').removeClass('active-progress');
            }
        });
        jQuery('.prgoress_indicator').on('click', function(event) {
            event.preventDefault();
            jQuery('html, body').animate({ scrollTop: 0 }, duration);
            return false;
        });

        /*-----------------------------
          Slider and Swiper for Testimonial
        -----------------------------*/
        var galleryThumbs = new Swiper('.img_persong', {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });
        var galleryTop = new Swiper('.content_swiper', {
            spaceBetween: 10,
            autoplay: {
                delay: 2500,
                disableOnInteraction: true,
            },
            thumbs: {
                swiper: galleryThumbs
            }
        });

        /*-----------------------------
          Swiper WorkSpace
        -----------------------------*/
        var galleryThumbs = new Swiper('.person_thumbs', {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });
        var galleryTop = new Swiper('.swipe_circle', {
            spaceBetween: 10,
            autoplay: {
                delay: 2500,
                disableOnInteraction: true,
            },
            thumbs: {
                swiper: galleryThumbs
            }
        });

        /*-----------------------------
        Slider and Swiper for Testimonial (Interior)
        -----------------------------*/
        var swiper = new Swiper(".swiper_default", {
            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true,
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: true,
            },
        });

        /*-----------------------------
          swip__topic
        -----------------------------*/

        var swiper = new Swiper('.swipe_basic_topic', {
            slidesPerView: 4,
            spaceBetween: 30,
            freeMode: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            breakpoints: {
                240: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                540: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            }
        });

        /*-----------------------------
          feature_strories
        -----------------------------*/

        var swiper = new Swiper('.feature_strories', {
            slidesPerView: 4,
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                240: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                540: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            }
        });

        /*-----------------------------
          countdown Timer
        -----------------------------*/
        $(".countdown").countdown();

        /*-----------------------------
          progress-bar
        -----------------------------*/
        var delay = 400;
        $(".progress-bar").each(function(i) {
            $(this).delay(delay * i).animate({
                width: $(this).attr('aria-valuenow') + '%'
            }, delay);
        });

        /*-----------------------------
          bxslider for Logos (animation like news)
        -----------------------------*/
        $('.bxslider').bxSlider({
            minSlides: 1,
            maxSlides: 8,
            slideWidth: 160,
            slideMargin: 0,
            ticker: true,
            speed: 20000
        });


        /*-----------------------------
          COUNTER-UP JQUERY PLUGIN
        -----------------------------*/
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });

        /*-----------------------------
          swiper__center
        -----------------------------*/
        var swiper = new Swiper('.swiper__center', {
            slidesPerView: 3,
            centeredSlides: false,
            spaceBetween: 30,
            grabCursor: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                240: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                540: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }
        });

        /*-----------------------------
          Mousehover for dropdown
        -----------------------------*/
        $('.dropdown.dropdown-hover').hover(
            function() {
                $(this).addClass('show')
            },
            function() {
                $(this).removeClass('show')
            });

        $('.dropdown-submenu.dropdown-hover').hover(
            function() {
                $(this).addClass('show')
            },
            function() {
                $(this).removeClass('show')
            });

        /*-----------------------------
    Dropdown menu for mobile
  -----------------------------*/
        var coll = document.getElementsByClassName("dropdown_menu");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.height) {
                    content.style.height = null;
                } else {
                    content.style.height = content.scrollHeight + "px";
                }
            });
        };

        // End.

    });


    /*-----------------------------
      Video Modal
    -----------------------------*/
    // Gets the video src from the data-src on each button
    var $videoSrc;
    $('.btn_video').on('click', function() {
        $videoSrc = $(this).data("src");
    });

    console.log($videoSrc);

    // when the modal is opened autoplay it
    $('#mdllVideo').on('shown.bs.modal', function(e) {

        // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })

    // stop playing the youtube video when I close the modal
    $('#mdllVideo').on('hide.bs.modal', function(e) {
        // a poor man's stop video
        $("#video").attr('src', $videoSrc);
    });

    /*-----------------------------
      show Toast after (8000)
    -----------------------------*/
    setTimeout(() => {
        $("#myTost").toast('show')
    }, 8000);

    /*-----------------------------
      animation on Scroll AOS.js
    -----------------------------*/
    AOS.init({
        easing: 'ease-in-out', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        duration: 500, // values from 0 to 3000, with step 50ms
    });

    /*-----------------------------
      cover-parallax
    -----------------------------*/
    var image = document.getElementsByClassName('cover-parallax');
    new simpleParallax(image, {
        delay: .6,
        transition: 'cubic-bezier(0,0,0,1)'
    });

    var image = document.getElementsByClassName('basic-parallax');
    new simpleParallax(image, {
        delay: .6,
        transition: 'cubic-bezier(0,0,0,1)'
    });

    var image = document.getElementsByClassName('horizontal-parallax');
    new simpleParallax(image, {
        orientation: 'right'
    });

    var image = document.getElementsByClassName('scale-parallax');
    new simpleParallax(image, {
        scale: 1.5
    });

    var image = document.getElementsByClassName('transition-parallax');
    new simpleParallax(image, {
        delay: .6,
        transition: 'cubic-bezier(0,0,0,1)'
    });




    /*-----------------------------
      Checkbox Select
    -----------------------------*/
    $('.checkbox-item .item-select').on('click', function() {
        $(this).parent().find('.item-select.active').removeClass('active');
        $(this).addClass('active');
    });

    /*-----------------------------
        feature_strories
      -----------------------------*/

    var swiper = new Swiper('.blog-slider', {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            240: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            540: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        }
    });

    /*-----------------------------
        swiper_vertical
      -----------------------------*/
    var swiper = new Swiper('.swiper_vertical', {
        direction: 'vertical',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        // mousewheel: {
        //   enable: true
        // },
    });

    /*-----------------------------
       tooltip
     -----------------------------*/
    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    });

    /*-----------------------------
   fixSide_scroll
 -----------------------------*/
    var sticky = new Sticky('.fixSide_scroll');


}(jQuery));


/*-----------------------------
  ScrollMagic (init controller)
-----------------------------*/
var controller = new ScrollMagic.Controller();