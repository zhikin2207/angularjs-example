(function () {
    'use strict';

    angular
        .module('VideoPortalApp')
        .config(config);

    /* @ngInject */
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/courses', '/courses/list');
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'components/authentication/login.tpl.html',
                controller: 'Login',
                controllerAs: 'loginVm',
                data: {
                    label: 'Login'
                }
            })
            .state('courses', {
                url: '/courses',
                template: '<div ui-view></div>',
                data: {
                    requireAuth: true,
                    label: 'Courses'
                }
            })
            .state('courses.list', {
                url: '/list',
                templateUrl: 'components/courses/courses.tpl.html',
                controller: 'Courses',
                controllerAs: 'coursesVm',
                data: {
                    requireAuth: true,
                    label: 'List'
                }
            })
            .state('courses.new', {
                url: '/new',
                templateUrl: 'components/courses/course-edit/course-edit.tpl.html',
                controller: 'CourseEdit',
                controllerAs: 'courseVm',
                data: {
                    requireAuth: true,
                    label: 'New'
                },
                resolve: {
                    authors: getAllAuthors,
                    course: getEmptyCourse
                }
            })
            .state('courses.edit', {
                url: '/{id:int}',
                templateUrl: 'components/courses/course-edit/course-edit.tpl.html',
                controller: 'CourseEdit',
                controllerAs: 'courseVm',
                data: {
                    requireAuth: true,
                    label: '{{ course.title }}',
                    interpolate: true
                },
                resolve: {
                    authors: getAllAuthors,
                    course: getCourse
                }
            });
    }

    /* @ngInject */
    function getAllAuthors(authorService) {
        return authorService.getAll();
    }

    /* @ngInject */
    function getCourse($state, $stateParams, $log, courseService) {
        return courseService.get($stateParams.id)
            .then(function (course) {
                return course;
            })
            .catch(function(error) {
                $log.warn(error);
                $state.go('courses.list');
            });
    }

    function getEmptyCourse() {
        return {
            duration: 0,
            authors: []
        };
    }
})();

