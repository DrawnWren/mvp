var fangu = angular.module('fangu',['ui.router', 'fangu.services', 'fangu.analysis']);

console.log('Fangu is up!', fangu);

fangu.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

       $stateProvider
       .state('Home', {
           url: '/home',
           templaterUrl: 'partials/home.html'
       })
       .state('Analyze', {
           url: "/analyze",
          templateUrl: "partials/analyze.html",
          controller: 'AnalysisController'
       })
        .state('Results', {
            url: "/results",
            templateUrl: "partials/results.html",
            controller: 'ResultsController'
        });
    }]);
