(function () {
    'use strict';

    angular
        .module('VideoPortalApp')
        .factory('userService', userService);

    /* @ngInject */
    function userService($resource) {
        var resource = $resource('/data/users/:id');

        return {
            get: getUser,
            getAll: getAllUsers
        };

        function getUser(id) {
            return resource.get({id: id}).$promise;
        }

        function getAllUsers() {
            return resource.query().$promise;
        }
    }
})();