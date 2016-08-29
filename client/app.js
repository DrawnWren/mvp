var fangu = angular.module('fangu',['ui.router'];

fangu.config( function ($stateProvider, $urlRouteProvider) {
   $stateProvider
   .state('Analyze', {
       url: "/analyze",
      templateUrl: "partials/analyze.html",
      controller: analysisController 
   }
    .state('Results', {
        url: "/results",
        templateUrl: "partials/results.html",
        controller: resultsController
    }
});
