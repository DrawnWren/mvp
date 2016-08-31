var results = angular.module('fangu.results', []); 


results.controller('ResultController', function($scope, Results) {
    $scope.data = {}; 
    $scope.isLoading = function (el) { 
        if (el === 'Loading') return true;
        else return false;
    }
    Results.getShort().then( (d) =>{
        console.log(d);
     $scope.data = d;
    });
}); 
