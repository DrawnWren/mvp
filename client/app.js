var fangu = angular.module('fangu',['ui.router', 'fangu.services', 'fangu.analysis',
'fangu.results', 'fangu.singleResult']);

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
       .state('ResultById', {
           url: '/resultById?resultId',
           templateUrl: 'partials/singleResult.html',
           controller: 'SingleResultController'
       })
        .state('Results', {
            url: "/results",
            templateUrl: "partials/results.html",
            controller: 'ResultController'
        });
    }]);
