'use strict';

//  define app
var app = angular.module('roskildeApp', ['ui.router', 'ngAnimate'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('signin', {
            url: '/signin',
            templateUrl: 'views/signin.html',
            controller: 'authController',
            data: {
                title: 'Signin'
            },
            secure: false
        })

        .state('bands', {
            url: '/bands',
            templateUrl: 'views/bands.html',
            controller: 'bandController',
            data: {
                title: 'Bands'
            },
            secure: true
        })

        .state('timetable', {
            url: '/timetable',
            templateUrl: 'views/timetable.html',
            controller: 'bandController',
            data: {
                title: 'My plan'
            },
            secure: true
        })

        .state('friends', {
            url: '/friends',
            templateUrl: 'views/friends.html',
            data: {
                title: 'Friends'
            },
            secure: true
        });

    $urlRouterProvider.otherwise('/signin');
}])

//  app init
.run(['$rootScope', '$state', 'authService', function($rootScope, $state, authService) {
    
    $rootScope.page = "";

    //  listen for state changes
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
        //  get current page title
        $rootScope.page = toState.data.title;
        //  check if page needs authorization
        authService.verify().then(function(res) {
            if(toState.secure && !res.data.auth) {
                $state.go('signin');
            }
            authService.setUser(res.user);
        });
    })
}]);
