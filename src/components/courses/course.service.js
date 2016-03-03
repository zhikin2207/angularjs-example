(function () {
    'use strict';

    angular
        .module('VideoPortalApp')
        .factory('courseService', courseService);

    /* @ngInject */
    function courseService($resource) {
        var resource = $resource('/data/courses/:id', {}, {
            'update': {method: 'PUT'}
        });

        return {
            add: addCourse,
            get: getCourse,
            getAll: getAllCourses,
            remove: removeCourse,
            update: updateCourse
        };

        function addCourse(course) {
            course.id = getRandomId();

            return resource.save({id: course.id}, course).$promise;
        }

        function getCourse(id) {
            return resource.get({id: id}).$promise;
        }

        function getAllCourses() {
            return resource.query().$promise;
        }

        function removeCourse(id) {
            return resource.delete({id: id}).$promise;
        }

        function updateCourse(course) {
            return resource.update({id: course.id}, course).$promise;
        }

        function getRandomId() {
            return Math.floor(Math.random() * 100000);
        }
    }
})();