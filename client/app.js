var fangu = angular.module('fangu',['ui.router', 'fangu.services', 'fangu.analysis',
'fangu.results', 'fangu.singleResult', 'ngMaterial']);

console.log('Fangu is up!', fangu);

fangu.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('grey');
});

fangu.config(['$stateProvider', '$urlRouterProvider', '$sceProvider', function ($stateProvider, $urlRouterProvider, $sceProvider) {
    $urlRouterProvider.otherwise('/home');
    $sceProvider.enabled(false);
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
