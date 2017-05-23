'use strict';

/**
 * @ngdoc overview
 * @name ngmaterialApp
 * @description
 * # ngmaterialApp
 *
 * Main module of the application.
 */
angular
    .module('ngmaterialApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngMaterial',
        'ui.router',
        'ngMdIcons',
    ])
    .config(
    function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                views: {
                  'header': {
                    templateUrl: 'views/partials/header.html',
                    controller: 'AppCtrl'
                  },
                  'footer': {
                    templateUrl: 'views/partials/footer.html',
                    controller: 'AppCtrl'
                  }
                }
            })
            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'views/home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })
            .state('app.developer', {
                url: '/developer',
                views: {
                    'menuContent': {
                        templateUrl: 'views/developer.html',
                        controller: 'DeveloperCtrl'
                    }
                }
            })
            .state('app.quiz', {
                url: '/quiz',
                views: {
                    'menuContent': {
                        templateUrl: 'views/quiz.html',
                        controller: 'QuizCtrl'
                    }
                }
            })
        ;

        $urlRouterProvider.otherwise('/app/home');
    })
    .controller('AppCtrl', ['$scope', '$location', '$mdSidenav', '$mdToast', AppCtrl]);

function AppCtrl($scope, $location, $mdSidenav, $mdToast) {
    $scope.goHome = function () {
        $location.path('/app/home');
        $scope.menuTitle = 'Home';
    };

    $scope.goPage = function () {
        $location.path('/app/developer');
        $scope.menuTitle = 'Developer';
    };

    $scope.goOther = function () {
        $location.path('/app/quiz');
        $scope.menuTitle = 'Quiz';
    };

    $scope.toggleSidenav = function () {
      $mdSidenav('left').toggle();
    };

    $scope.toastMessage = 'Hello There!';

    $scope.showToast = function (message) {
      var toast = $mdToast.simple()
        .content(message)
        .action('Close')
        .highlightAction(true)
        .position('top right');

        $mdToast.show(toast);
    };
}
