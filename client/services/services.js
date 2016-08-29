angular.module('fangu.services', [])

  .factory('Analyses', function ($http) {
      var getAnalysis = function () {
          return $http({
              method: 'GET',
              url: '/api/analysis',
          }).then( d => d.data );
      };
      var analyzeThis = function (url) {
          return $http({
              method: 'POST',
              url: '/api/analysis',
              data: url
      };
      
      return {analyze: analyzeThis,
          getAnalysis: getAnalysis};
  })
