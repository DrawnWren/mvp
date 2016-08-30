angular.module('fangu.services', [])

  .factory('Analyses', function ($http) {
      var analyzeThis = function (url) {
          return $http({
              method: 'POST',
              url: '/api/analysis',
              data: {url: url}
          }).then( d => console.log(d) )
          .catch( e => console.log('Error! ', e) );
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
      
    var getById = function (id) {
        var qUrl = '/api/byId/' + id;
        return $http({
            method: 'GET',
            url: qUrl
        }).then( d => d.data);
    };

    var getShort = function () {
        return $http({
            method: 'GET',
            url: '/api/analysis/short'
    }).then( d => d.data );
    };

    return {getResults: getResults,
    getShort: getShort,
    getById: getById};

  });
