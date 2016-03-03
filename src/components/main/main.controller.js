(function () {
    'use strict';

    angular
        .module('VideoPortalApp')
        .controller('Main', Main);

    /* @ngInject */
    function Main($state, authenticationService, breadcrumbsService) {
        /*jshint validthis: true */
        var vm = this;

        vm.authData = authenticationService.authData;
        vm.breadcrumbs = breadcrumbsService.breadcrumbs;
        vm.signOut = signOut;

        activate();

        function signOut() {
            authenticationService.signOut();
            $state.go('login');
        }

        function activate() {
            var userAuthenticated = authenticationService.checkUserAuthenticated();

            if (userAuthenticated) {
                authenticationService.getCurrentUserInfo();
            }
        }
    }
})();

