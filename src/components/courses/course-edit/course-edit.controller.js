(function () {
    'use strict';

    angular
        .module('VideoPortalApp')
        .controller('CourseEdit', CourseEdit);

    /* @ngInject */
    function CourseEdit($state, $uibModal, courseService, authors, course) {
        var vm = this;

        vm.authors = authors;
        vm.cancel = cancel;
        vm.course = course;
        vm.save = save;

        function cancel() {
            $state.go('courses.list');
        }

        function save() {
            var formValid = vm.form.$valid && vm.course.authors.length > 0;

            if (formValid) {
                if (vm.course.id === undefined) {
                    courseService.add(vm.course);
                } else {
                    courseService.update(vm.course);
                }

                $state.go('courses.list');
            } else {
                $uibModal.open({ templateUrl: 'validationDialog.html' });
            }
        }
    }
})();