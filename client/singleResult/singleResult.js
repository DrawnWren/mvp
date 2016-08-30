var singleResult = angular.module('fangu.singleResult', []);

singleResult.controller('SingleResultController', function($scope, $stateParams, Results) {
    $scope.id = $stateParams.resultId; 
    console.log('Single result id is ', $scope.id);
    $scope.data = {};
    Results.getById($scope.id).then( d => {
        console.log(d)
        $scope.data = d;
    });
    console.log('Data is ', $scope.data);
});
