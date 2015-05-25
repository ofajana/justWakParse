'use strict';

angular.module('justWak',['ngRoute','ngAnimate','ui.bootstrap']).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/index', controller: IndexController});
    $routeProvider.when('/sms', {templateUrl: 'partials/sms', controller: IndexController});
    $routeProvider.otherwise({redirectTo: '/'});
    
    // use the HTML5 History API
        $locationProvider.html5Mode(true);
    }]);
