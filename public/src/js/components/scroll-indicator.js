var $ = require('jquery');
var angular = require('angular');

var moduleName = 'drc.components.scroll-indicator';
module.exports = moduleName;

var INDICATOR_CHANGE_EVENT = 'drcScrollIndicatorChange';

angular.module(moduleName, [])
.factory('scrollIndicator', function ($rootScope) {
    var listenersAdded = false;
    var indicators, milestones, activeMilestone;


    return {
        init: function () {
            indicators = $('[data-drc-scroll-indicator]');
            milestones = $('[data-drc-scroll-milestone]');

            activeMilestone = indicators[0].getAttribute('data-drc-scroll-indicator');
            $rootScope.$broadcast(INDICATOR_CHANGE_EVENT, activeMilestone);

            this.addListeners();
        },
        addListeners: function () {
            if(listenersAdded) {
                return;
            }

            $(window).on('scroll.scrollIndicator resize.scrollIndicator', this.scrollListener.bind(this));

            listenersAdded = true;
        },
        scrollListener: function (e) {
            var viewThreshold = parseInt($(window).height() * 0.6);
            closestMilestone = {
                position: -Infinity,
                element: null
            };

            milestones.each((function (index, element) {
                var fromThreshold = element.getBoundingClientRect().top - viewThreshold;

                if(fromThreshold < 0 && fromThreshold > closestMilestone.position) {
                    closestMilestone.position = fromThreshold;
                    closestMilestone.element = element;
                }
            }).bind(this));

            if(
                closestMilestone.element.getAttribute('data-drc-scroll-milestone') !==
                activeMilestone
            ) {
                activeMilestone = closestMilestone.element.getAttribute('data-drc-scroll-milestone');
                $rootScope.$broadcast(INDICATOR_CHANGE_EVENT, activeMilestone);
            }

        }
    };
})
.directive('drcScrollIndicator', function ($rootScope, scrollIndicator) {
    return {
        controller: function ($scope, $element, $attrs) {
            $element = $($element);

            $rootScope.$on('drcScrollIndicatorChange', function (event, data) {
                if(data === $attrs.drcScrollIndicator) {
                    $element.addClass('active');
                }
                else {
                    $element.removeClass('active');
                }
            });
        },
        link: function ($scope, $element, $attrs) {
            scrollIndicator.init();
        }
    };
});
