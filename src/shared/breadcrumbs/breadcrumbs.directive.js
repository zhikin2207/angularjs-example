(function () {
    'use strict';

    angular
        .module('VideoPortalApp')
        .directive('breadcrumbs', breadcrumbs);

    function breadcrumbs() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'shared/breadcrumbs/breadcrumbs.tpl.html',
            scope: {
                breadcrumbs: '='
            }
        };

        return directive;
    }
})();