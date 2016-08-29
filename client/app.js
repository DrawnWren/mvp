var fangu = angular.module('fangu',['ui.router'])
    .config( function ($stateProvider, $urlRouteProvider) {
       $stateProvider
       .state('Analyze', {
           url: "/analyze",
          templateUrl: "partials/analyze.html",
          controller: 'AnalysisController'
       })
        .state('Results', {
            url: "/results",
            templateUrl: "partials/results.html",
            controller: 'ResultsController'
        })
    });
