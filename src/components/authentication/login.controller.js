(function () {
    'use strict';

    angular
        .module('VideoPortalApp')
        .controller('Login', Login);

    /* @ngInject */
    function Login($state, authenticationService) {
        /*jshint validthis: true */
        var vm = this;

        vm.alerts = [];
        vm.closeAlert = closeAlert;
        vm.signIn = signIn;

        function closeAlert(index) {
            vm.alerts.splice(index, 1);
        }

        function signIn(user) {
            return authenticationService
                .signIn(user.login, user.password)
                .then(handleUserAuth);

            function handleUserAuth(isAuthenticated) {
                if (isAuthenticated) {
                    $state.go('courses.list');
                } else {
                    vm.alerts.push({type: 'danger', msg: 'Wrong login or password'});
                    user.password = '';
                }
            }
        }
    }
})();