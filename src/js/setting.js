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