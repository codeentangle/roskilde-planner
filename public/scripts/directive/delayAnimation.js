//  directive to delay animation
app.directive('delayAnim', function() {
    return {
        link: function(scope, element, attrs) {
            element.css('-webkit-transition-delay', (attrs.delayAnim * 10) + "ms");
        }
    }
});
