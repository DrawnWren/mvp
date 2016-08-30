var analysis = angular.module('fangu.analysis', []); 


analysis.controller('AnalysisController', function($scope, Analyses) {
    $scope.link = '';
    $scope.fun = () => {
        console.log('Posting ', $scope.link);
        Analyses.analyze($scope.link);
        $scope.link = '';
    }
});
