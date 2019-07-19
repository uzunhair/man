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