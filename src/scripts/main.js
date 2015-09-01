var ngVtex = angular.module('ngVtex', ['ngRoute']);

ngVtex.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'partials/home.html',
            controller  : 'homeCtrl'
        })
        .when('/checkout', {
            templateUrl : 'partials/checkout.html',
            controller : 'checkoutCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});
