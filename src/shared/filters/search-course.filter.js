(function () {
    'use strict';

    angular
        .module('VideoPortalApp')
        .filter('searchCourse', searchCourse);

    function searchCourse() {
        return function (input, search) {
            if (!search) {
                return input;
            }

            search = search.toLowerCase();

            return input.filter(function (course) {
                var titleMatches = course.title.toLocaleLowerCase().indexOf(search) !== -1;
                var dateMatches = course.date.indexOf(search) !== -1;

                return titleMatches || dateMatches;
            });
        };
    }
})();