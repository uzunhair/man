'use strict';

var container = {
    smUp:    '576px',
    smDown:  '575px',
    mdUp:    '768px',
    mdDown:  '767px',
    lgUp:    '992px',
    lgDown:  '991px',
    xlUp:    '1200px',
    xlDown:  '1199px'
};

$(document).ready(function () {

    enquire
        .register("screen and (max-width:" + container.mdDown + ")", {
            // НЕ ОБЯЗАТЕЛЬНО
            // Срабатывает вызов, когда соответствует указанному медиа запросу - matched
            match: function() {
                cardHorisontalSlider();
            }
        })
        .register("screen and (max-width:" + container.lgDown + ")", {
            match: function() {
                cardVerticalSlider();
            }
        })
        .register("screen and (min-width:" + container.lgUp + ")", {
            match: function() {
                breadcrumb();
                hoverBreadcrumb();
                dropdownMenuHeight();
            }
        });

    dropdownMenu();

    $(function () {
        $("[data-toggle='tooltip']").tooltip();
    });

    $(function () {
        $("[data-toggle='popover']").popover();
    });

    $(function(){
        // Большой слайдер на главной странице
        var $slideshow = $('.js_slideshow');

        $slideshow.slick({
            autoplay: true,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            dots: true,
            asNavFor: '.js_slideshow-nav'
        });

        var $slideshowNav = $('.js_slideshow-nav');

        $slideshowNav.slick({
            arrows: false,
            slidesToShow: 1,
            asNavFor: '.js_slideshow',
            focusOnSelect: true
        });

    });

    $(function(){
        // Функция отображения/скрытия мобильного меню
        var $pageHeaderToggler =$('.js_page-header-toggler');

        $pageHeaderToggler.click(function(){
            $(this).toggleClass('open');
            $('body').toggleClass('state-menu-active');
        });

    });

});

// Breadcrumb
function breadcrumb() {
    // Получаем значение text() элементов breadcrumb
    var breadcrumbList =[];
    $('.js_breadcrumb > li > a').each(function(){
        breadcrumbList.push($(this).attr("title"));
    });
    breadcrumbList.push($('.js_breadcrumb > li.active').text());

    $('.js_page-header-nav > li > a').each(function () {
        // Ищем в меню нужный нам пункт меню

        if ($(this).text() === breadcrumbList[1] && breadcrumbList[1]) {
            // Находим родителя
            var thisParent = $(this).parent('.js_page-header-nav-item');
            var childrenLink = thisParent.find('.page-header-nav-dropdown-nav > li').children('a');

            // Добавляем ссылки в breadcrumbFirst
            childrenLink.each(function () {

                if ($(this).text() === breadcrumbList[2] && breadcrumbList[2]) {
                    var childrenLink2 = $(this).next('ul').children('li').children('a');
                    childrenLink2.each(function () {

                        if ($(this).text() === breadcrumbList[3] && breadcrumbList[3]) {
                            var childrenLink3 = $(this).next('ul').children('li').children('a');
                            childrenLink3.each(function () {
                                appendBreadcrumb(3, $(this).text(), $(this).attr('href'), breadcrumbList[4]);
                            });
                        }

                        appendBreadcrumb(2, $(this).text(), $(this).attr('href'), breadcrumbList[3]);
                    });

                }

                appendBreadcrumb(1, $(this).text(), $(this).attr('href'), breadcrumbList[2]);
            });
        }
    });
}

function appendBreadcrumb (level, text, href, active) {
    var isActive = false;
    if (text === active) {
        isActive = 'state_active';
    }
    $('.js_breadcrumb > li:eq('+ level +') > .js_breadcrumb-dropdown').append('<a href="' + href + '" class="breadcrumb-dropdown-link '+ isActive +'">' + text + '</a>');
}

function hoverBreadcrumb() {
    $('.breadcrumb-item').hover(
        function(){$(this).addClass('state_active');},
        function(){$(this).removeClass('state_active');}
    );
}

function dropdownMenu() {
    $('.js_dropdown-menu a.js_page-header-nav-dropdown-toggle').on('click', function (e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        var $subMenu = $(this).next(".js_dropdown-menu");
        $subMenu.toggleClass('show');

        $(".js_page-header-nav-item").on("hidden.bs.dropdown", function (event) {
            $('.state_page-header-nav-dropdown-submenu.show').removeClass("show");
            $('.js_page-header-nav-dropdown').css("min-height", "auto");
        });

        return false;
    });
    
    $('.js-nav-item__2').on('click', function (e) {
        e.stopPropagation();
        $(this).parent('.dropdown-menu').removeClass("show");
    });
}

function dropdownMenuHeight() {
    $('.js_page-header-nav-dropdown-toggle').on('click', function (e) {
        var mh = 0;
        $(".state_page-header-nav-dropdown-submenu.show").each(function () {
            var h_block = parseInt($(this).height());
            if (h_block > mh) {
                mh = h_block;
            }
        });
        var dropdownSubmenuHeight = mh + 100;

        $('.js_page-header-nav-dropdown.show').css("min-height", dropdownSubmenuHeight);
    });
}

// Card-vertical-carousel

function cardVerticalSlider() {

    $('.js_card-carousel').slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 4096,
                settings: "unslick",
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                    arrows: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: true,
                }
            }
        ]
    });
}

// Card-horisontal-carousel

function cardHorisontalSlider() {

    $('.js_card-horisontal-carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        responsive: [
            {
                breakpoint: 4096,
                settings: "unslick",
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                }
            }
        ]
    });

}

/**
 * Init simple ajax form
 */
jQuery(document).ready(function($) {
    // Feedback
    $('#feedbackForm').simpleSendForm({
        successTitle: "Ваше сообщение отправлено!",
        successText: "Мы свяжемся с Вами в самое ближайшее время",
        captcha: false,
        mailUrl: "/templates/template_zm_it/form-submit/submit.php"
    });
}); // end ready


'use strict';

(function ($) {
    var pluginName = 'toggleBSCollapse',
        defaults = {};

    function Plugin(element, options) {
        this.$elem = $(element);
        this.$parent = this.$elem.closest('[role="tablist"]');
        this.$contentContainer = this.$parent.find('[role="tabpanel"]');
        this.settings = $.extend({}, defaults, options);
        this.init();
    }

    $.extend(Plugin.prototype, {

        init: function init() {
            var me = this;

            this.$elem.on('click', function () {

                if (me.$elem.hasClass('state_all-hidden')) {
                    me.$contentContainer.collapse('show');
                } else {
                    me.$contentContainer.collapse('hide');
                }

                me.$elem.toggleClass('state_all-hidden');
                return false;
            });

            this.$contentContainer.on('shown.bs.collapse hidden.bs.collapse', function () {

                var visibleItems = me.$contentContainer.filter('.show').length;

                if (window.accordionTimeout) {
                    clearTimeout(window.accordionTimeout);
                }

                window.accordionTimeout = setTimeout(function () {
                    if (visibleItems === me.$contentContainer.length) {
                        me.$elem.removeClass('state_all-hidden');
                    } else {
                        me.$elem.addClass('state_all-hidden');
                    }
                }, 250);
            });
        }
    });

    $.fn[pluginName] = function (options) {

        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery);

$(function () {

    var $accordionToggle = $('.js_toggle-accordion');

    $('#modal').on('shown.bs.modal.content.generated', function () {
        setTimeout(function () {
            var $myAccordionToggle = $('.js_toggle-accordion');
            $myAccordionToggle.toggleBSCollapse();
        }, 100);
    });
    if ($accordionToggle.length) {
        $accordionToggle.toggleBSCollapse();


        /*
         * If accordion is within a slick slider, the visibility and therefore height needs to be adjusted in a seperated way.
         * Also the slick slider container needs the class "slider-height-auto" width .slick-list { height:auto !important; }
         */
        setTimeout(function () {
            // Timeout necessary because the slick slider is initialized after the accordion

            var $slickSlider = $accordionToggle.closest('.slick-slider');

            if ($slickSlider.length) {

                $slickSlider.addClass('slider-height-auto');
                $slickSlider.find('.js_accordion').hide();

                $slickSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                    $(slick.$slides[nextSlide]).find('.js_accordion').show();
                });
                $slickSlider.on('afterChange', function (event, slick, currentSlide) {

                    $slickSlider.find('.slick-slide:not(.slick-current) .js_accordion').hide();
                });
                $slickSlider.find('.slick-slide.slick-current .js_accordion').show();
            }
        }, 250);
    }
});
