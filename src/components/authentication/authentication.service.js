(function () {
    'use strict';

    angular
        .module('VideoPortalApp')
        .factory('authenticationService', authenticationService);

    /* @ngInject */
    function authenticationService($cookies, userService) {
        var AuthKey = 'USER_DATA';

        var authData = {
            userAuthenticated: false,
            user: {}
        };

        return {
            authData: authData,
            checkUserAuthenticated: checkUserAuthenticated,
            getCurrentUserInfo: getCurrentUserInfo,
            signIn: signIn,
            signOut: signOut
        };

        function checkUserAuthenticated() {
            var userData = $cookies.get(AuthKey);
            authData.userAuthenticated = userData !== undefined;

            return authData.userAuthenticated;
        }

        function getCurrentUserInfo() {
            var userId = $cookies.get(AuthKey);

            return userService.get(userId).then(function (user) {
                authData.user = user;

                return authData.user;
            });
        }

        function signIn(username, password) {
            return userService.getAll().then(function (users) {
                var user = findUser(users, username, password);

                var isAuthenticated = user !== undefined;

                if (isAuthenticated) {
                    saveAuthData(user.id);

                    authData.user = user;
                    authData.userAuthenticated = true;
                }

                return isAuthenticated;
            });
        }

        function signOut() {
            removeAuthData();

            authData.user = {};
            authData.userAuthenticated = false;
        }

        function findUser(users, username, password) {
            for(var i = 0; i < users.length; i++) {
                if (users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }

            return undefined;
        }

        function saveAuthData(userData) {
            $cookies.put(AuthKey, userData);
        }

        function removeAuthData() {
            $cookies.remove(AuthKey);
        }
    }
})();

