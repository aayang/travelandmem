'use strict';
//services
angular.module('planner').factory('events', ['$http', function($http) {
  return $http.get('client/event-data.json')
    .success(function(data) {
      return data;
    })
    .error(function(err){
      return err;
    });
}]);
