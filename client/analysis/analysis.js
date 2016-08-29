var analysis = angular.module('fangu.analysis', []); 


analysis.controller('AnalysisController', function($scope, Analyses) {
    $scope.data = {}; 
    Analyses.getData().then( (d) => $scope.data = d );
});
