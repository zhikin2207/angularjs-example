(function () {
    'use strict';

    angular
        .module('VideoPortalApp')
        .directive('durationConverter', durationConverter);

    function durationConverter() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'shared/duration-converter/duration-converter.tpl.html',
            scope: {
                duration: '='
            }
        };

        return directive;
    }
})();