var analysis = angular.module('fangu.analysis', []); 


analysis.controller('AnalysisController', function($scope, Analyses) {
    $scope.link = '';
    $scope.fun = Analyses.analyze;
});
