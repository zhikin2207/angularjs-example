(function() {
    'use strict';

    angular
        .module('VideoPortalApp')
        .controller('confirmDeleteModal', confirmDeleteModal);

    /* @ngInject */
    function confirmDeleteModal($uibModalInstance, course) {
        /*jshint validthis: true */
        var vm = this;

        vm.cancel = cancel;
        vm.course = course;
        vm.ok = ok;

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function ok() {
            $uibModalInstance.close(vm.course.id);
        }
    }
})();

