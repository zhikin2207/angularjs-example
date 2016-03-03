(function () {
    'use strict';

    angular
        .module('VideoPortalApp')
        .factory('authorService', authorService);

    /* @ngInject */
    function authorService($resource) {
        var resource = $resource('/data/authors');

        return {
            getAll: getAllAuthors
        };

        function getAllAuthors() {
            return resource.query().$promise;
        }
    }
})();