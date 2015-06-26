var angular = require('angular');
var $ = require('jquery');

var moduleName = 'drc.components.sticky';
module.exports = moduleName;

angular.module(moduleName, [])
.directive('drcSticky', function () {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attrs) {
            $element = $($element);
            var anchorPoint = $element.get(0).getBoundingClientRect().top;


            var stick = function () {
                $element.css({
                    position: 'fixed',
                    top: 0,
                    transform: 'translateZ(0)',
                    msTransform: 'translateZ(0)',
                    webkitTransform: 'translateZ(0)',
                    width: $element.get(0).getBoundingClientRect().width
                });
            };

            var unstick = function () {
                $element.css({
                    position: '',
                    transform: '',
                    msTransform: '',
                    webkitTransform: '',
                    width: ''
                });
            };

            $(window).on('scroll resize', function () {
                if($element.get(0).getBoundingClientRect().height > $(window).innerHeight()) {
                    return;
                }

                if($(window).scrollTop() > anchorPoint) {
                    stick();
                }
                else {
                    unstick();
                }
            });
        }
    };
});
