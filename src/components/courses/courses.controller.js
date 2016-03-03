(function () {
    'use strict';

    angular
        .module('VideoPortalApp')
        .controller('Courses', Courses);

    /* @ngInject */
    function Courses($uibModal, courseService) {
        /*jshint validthis: true */
        var vm = this;

        vm.applySearchFilter = filterCourses;
        vm.removeCourse = removeCourse;

        activate();

        function activate() {
            return courseService.getAll().then(function (courses) {
                vm.courses = courses;
            });
        }

        function filterCourses(search) {
            vm.search = search;
        }

        function removeCourse(index) {
            return $uibModal
                .open({
                    templateUrl: 'removeConfirmation.html',
                    controller: 'confirmDeleteModal as modalVm',
                    resolve: {
                        course: function () {
                            return vm.courses[index];
                        }
                    }
                })
                .result
                .then(courseService.remove)
                .then(function () {
                    vm.courses.splice(index, 1);
                });
        }
    }
})();