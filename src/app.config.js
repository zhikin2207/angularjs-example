(function () {
    'use strict';

    angular
        .module('VideoPortalApp', ['ngResource', 'ngCookies', 'ui.router', 'ui.bootstrap'])
        .run(run);

    /* @ngInject */
    function run($rootScope, $state, authenticationService, breadcrumbsService) {
        $rootScope.$on('$stateChangeStart', validateUserAuth);

        $rootScope.$on('$stateChangeSuccess', breadcrumbsService.updateBreadcrumbs);

        function validateUserAuth(event, toState) {
            var userAuthenticated = authenticationService.checkUserAuthenticated();

            if (toState.name === 'login' && userAuthenticated) {
                event.preventDefault();
                $state.go('courses.list');
            } else if (toState.data !== undefined && toState.data.requireAuth && !userAuthenticated) {
                event.preventDefault();
                $state.go('login');
            }
        }
    }
})();