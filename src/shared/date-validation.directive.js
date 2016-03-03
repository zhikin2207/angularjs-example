(function () {
    'use strict';

    angular
        .module('VideoPortalApp')
        .directive('dateValidation', dateValidation);

    function dateValidation() {
        var directive = {
            restrict: 'A',
            link: function (scope, element) {
                element.on('keydown', function (event) {
                    var keyCode = event.keyCode;

                    var numericKeyCode = isNumericKeyCode(keyCode);
                    var dotKeyCode = isDotKeyCode(keyCode);
                    var navigationKeyCode = isNavigationKeyCode(keyCode);

                    return numericKeyCode || dotKeyCode || navigationKeyCode;
                });
            }
        };

        return directive;

        function isNumericKeyCode(keyCode) {
            return (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105);
        }

        function isDotKeyCode(keyCode) {
            return keyCode === 190;
        }

        function isNavigationKeyCode(keyCode) {
            var navigationKeyCodes = [8, 9, 35, 36, 37, 38, 39, 40, 46, 116];

            return navigationKeyCodes.indexOf(keyCode) !== -1;
        }
    }
})();


