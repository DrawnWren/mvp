var analysis = angular.module('fangu.analysis', []); 


analysis.controller('AnalysisController', function($scope, Analyses) {
    $scope.data = {}; 
    Analyses.getAnalysis().then( (d) => $scope.data = d );
});
