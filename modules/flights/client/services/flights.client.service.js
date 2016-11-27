'use strict';

//flights service used for communicating with the flights REST endpoints
angular.module('flights').factory('Flights', ['$resource',
  function ($resource) {
    return $resource('api/flights/:flightId', {
      flightId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
