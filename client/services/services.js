angular.module('fangu.services', [])

  .factory('Analyses', function ($http) {
      var analyzeThis = function (url) {
          return $http({
              method: 'POST',
              url: '/api/analysis',
              data: {url: url}
          });
      };

      return {analyze: analyzeThis};
  })
  .factory('Results', function($http) {
    var getResults = function () {
          return $http({
              method: 'GET',
              url: '/api/analysis',
          }).then( d => d.data );
      };

    return {getResults: getResults};

  });
