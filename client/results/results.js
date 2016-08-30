var results = angular.module('fangu.results', []); 


results.controller('ResultController', function($scope, Results) {
    $scope.data = {}; 

    Results.getResults().then( (d) => $scope.data = d );
}); 
