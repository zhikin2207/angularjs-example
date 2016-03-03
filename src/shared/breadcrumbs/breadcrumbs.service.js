(function () {
    'use strict';

    angular
        .module('VideoPortalApp')
        .factory('breadcrumbsService', breadcrumbsService);

    /* @ngInject */
    function breadcrumbsService($state, $interpolate) {
        var breadcrumbs = [];

        return {
            breadcrumbs: breadcrumbs,
            updateBreadcrumbs: updateBreadcrumbs
        };

        function updateBreadcrumbs() {
            clearBreadcrumbs();

            breadcrumbs.unshift(getStateInfo($state.$current));

            var parentState = $state.$current.parent;

            while (parentState.data !== undefined) {
                breadcrumbs.unshift(getStateInfo(parentState));

                parentState = parentState.parent;
            }
        }

        function clearBreadcrumbs() {
            breadcrumbs.splice(0, breadcrumbs.length);
        }

        function getStateInfo(state) {
            var label = state.data.label;

            if (state.data.interpolate) {
                label = $interpolate(label)(state.locals.globals);
            }

            return {
                label: label,
                state: state.name
            };
        }
    }
})();

