var results = angular.module('fangu.results', []); 


results.controller('ResultController', function($scope, Results) {
    $scope.data = {}; 

    Results.getShort().then( (d) =>{
        console.log(d);
     $scope.data = d;
    });
}); 
