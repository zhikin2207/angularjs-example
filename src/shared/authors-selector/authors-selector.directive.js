(function () {
    'use strict';

    angular
        .module('VideoPortalApp')
        .directive('authorsSelector', authorsSelector);

    function authorsSelector() {
        var directive = {
            restrict: 'A',
            templateUrl: 'shared/authors-selector/authors-selector.tpl.html',
            scope: {
                allAuthors: '=',
                courseAuthors: '='
            },
            controller: AuthorsSelector,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    function AuthorsSelector() {
        /*jshint validthis: true */
        var vm = this;

        vm.addAuthors = addAuthors;
        vm.removeAuthors = removeAuthors;

        activate();

        function activate() {
            if (vm.courseAuthors) {
                for (var i = 0; i < vm.courseAuthors.length; i++) {
                    var authorIndex = getAuthorIndex(vm.allAuthors, vm.courseAuthors[i].id);
                    vm.allAuthors.splice(authorIndex, 1);
                }
            }
        }

        function addAuthors(selectedAuthors) {
            if (selectedAuthors !== undefined) {
                for (var i = 0; i < selectedAuthors.length; i++) {
                    var authorIndex = getAuthorIndex(vm.allAuthors, +selectedAuthors[i]);

                    if (authorIndex !== -1) {
                        vm.courseAuthors.push(vm.allAuthors[authorIndex]);
                        vm.allAuthors.splice(authorIndex, 1);
                    }
                }
            }
        }

        function removeAuthors(selectedAuthors) {
            if (selectedAuthors !== undefined) {
                for (var i = 0; i < selectedAuthors.length; i++) {
                    var authorIndex = getAuthorIndex(vm.courseAuthors, +selectedAuthors[i]);

                    if (authorIndex !== -1) {
                        vm.allAuthors.push(vm.courseAuthors[authorIndex]);
                        vm.courseAuthors.splice(authorIndex, 1);
                    }
                }
            }
        }

        function getAuthorIndex(authors, id) {
            for (var i = 0; i < authors.length; i++) {
                if (authors[i].id === id) {
                    return i;
                }
            }

            return -1;
        }
    }
})();