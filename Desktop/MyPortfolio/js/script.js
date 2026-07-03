/*
 * DOCU: Initializes portfolio plugins and UI listeners.
 * 
 * Last Updated: 2026-07-01
 * Author: Mariel Hope
 * Last Updated By: Mariel Hope
 */
$(document).ready(function() {

    if (document.querySelector('.typed-text') && typeof Typed !== 'undefined') {
        new Typed('.typed-text', {
            strings: ["Mariel Hope Balazuela.", "CS Graduate.", "Intelligent Systems Major."],
            typeSpeed: 60,
            backSpeed: 30,
            loop: true,
            showCursor: true
        });
    }

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    const awardsSwiperElement = document.querySelector('.awardsSwiper');
    if (awardsSwiperElement && typeof Swiper !== 'undefined') {
        new Swiper('.awardsSwiper', {
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
        });
    }

    const limits = {
        'dtect': 12,
        'burn': 7,
        'booknook': 5
    };

    let indices = {
        'dtect': 1,
        'burn': 1,
        'booknook': 1
    };

    /*
     * DOCU: Cycles project images.
     * @param {string} project - Project identifier
     * @param {number} direction - Next (1) or prev (-1)
     * @returns {void}
     *
     * Last Updated: 2026-07-02
     * Author: Mariel Hope
     * Last Updated By: Mariel Hope
     */
    window.changeImage = function(project, direction) {
        indices[project] += direction;

        if (indices[project] > limits[project]) {
            indices[project] = 1;
        }
        if (indices[project] < 1) {
            indices[project] = limits[project];
        }

        $(`#img-${project}`).attr('src', `../images/projects/${project}${indices[project]}.png`);
    };

    let isDown = false;
    let startX;
    let scrollLeft;
    const $nav = $('nav');

    $nav.on('mousedown', function(e) {
        isDown = true;
        $nav.css('cursor', 'grabbing');
        startX = e.pageX - $nav.offset().left;
        scrollLeft = $nav.scrollLeft();
    });

    $nav.on('mouseleave', function() {
        isDown = false;
        $nav.css('cursor', 'grab');
    });

    $nav.on('mouseup', function() {
        isDown = false;
        $nav.css('cursor', 'grab');
    });

    $nav.on('mousemove', function(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - $nav.offset().left;
        const walk = (x - startX) * 2;
        $nav.scrollLeft(scrollLeft - walk);
    });

    const $menuToggle = $('.menu-toggle');
    const $header = $('header');

    /*
     * DOCU: Toggles mobile nav.
     * @returns {void}
     *
     * Last Updated: 2026-07-03
     * Author: Mariel Hope
     * Last Updated By: Mariel Hope
     */
    $menuToggle.on('click', function() {
        const isOpen = $header.hasClass('nav-open');
        $header.toggleClass('nav-open', !isOpen);
        $(this).attr('aria-expanded', String(!isOpen));
    });

    $('header nav a').on('click', function() {
        if ($header.hasClass('nav-open')) {
            $header.removeClass('nav-open');
            $menuToggle.attr('aria-expanded', 'false');
        }
    });
});