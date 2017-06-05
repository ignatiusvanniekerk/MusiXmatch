/**
 * slide search bar up and down but angular js directive
 */
angular.module('angularSlideables', [])
.directive('slideable', function () {

    return {
        restrict:'C',
        compile: function (element, attr) {
            // wrap tag
            setTimeout(function(){console.log(element.scrollHeight)},500)
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');
            console.log(element.scrollHeight)
            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow-y': 'scroll',
                    'overflow-x': 'hidden',
                    'height': element.scrollHeight +'px',
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
})

myApp.directive('slideToggle', function() {
        return {

            restrict: 'A',
            link: function(scope, element, attrs) {
                var target = document.querySelector(attrs.slideToggle);
                attrs.expanded = false;
                var content = target.querySelector('.slideable_content');
                element.bind('click', function() {
                    var fav = document.getElementById('icon');
                    if(!attrs.expanded) {
                        fav.innerHTML = "<i class='fa fa-chevron-up' aria-hidden='true'></i><br/>close";
                        content.style.border = '1px solid rgba(0,0,0,0)';
                        var y = content.clientHeight;
                        content.style.border = 0;
                        target.style.height = y + 'px';
                    } else {
                        fav.innerHTML = "<i class='fa fa-chevron-down' aria-hidden='true'></i><br/>open";
                        target.style.height = '0px';
                    }

                    attrs.expanded = !attrs.expanded;
                });
            }
        }
    });