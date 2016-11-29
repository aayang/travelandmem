'use strict';

// Setting up route
angular.module('flights').config(['$stateProvider',
  function ($stateProvider) {
    // flights state routing
    $stateProvider
      .state('flights', {
        abstract: true,
        url: '/flights',
        template: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('flights.list', {
        url: '',
        templateUrl: 'modules/flights/views/list-flights.client.view.html'
      })
      .state('flights.create', {
        url: '/create',
        templateUrl: 'modules/flights/views/create-flight.client.view.html'
      })
      .state('flights.view', {
        url: '/:flightId',
        templateUrl: 'modules/flights/views/view-flight.client.view.html'
      })
      .state('flights.edit', {
        url: '/:flightId/edit',
        templateUrl: 'modules/flights/views/edit-flight.client.view.html'
      });
/*
      .state('flights.hotels', {
        url: '/create/hotels',
        templateUrl: 'modules/flights/views/create-hotel.client.view.html'
      })

      .state('flights.rentals', {
        url: '/create/rentals',
        templateUrl: 'modules/flights/views/create-rental.client.view.html'
      })

      .state('flights.other', {
        url: '/create/other',
        templateUrl: 'modules/flights/views/create-other.client.view.html'
      })

      .state('flights.flights', {
        url: '/create/flights',
        templateUrl: 'modules/flights/views/create-flight.client.view.html'
      });*/
  }
]);
