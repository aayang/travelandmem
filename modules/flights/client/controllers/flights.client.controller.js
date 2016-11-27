'use strict';

// flights controller
angular.module('flights').controller('FlightsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Flights',
  function ($scope, $stateParams, $location, Authentication, Flights) {
    $scope.authentication = Authentication;

    // Create new flight
    $scope.createFlight = function () {
      // Create new flight object
      var flight = new Flights({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      flight.$save(function (response) {
        $location.path('flights/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing flight
    $scope.removeFlight = function (flight) {
      if (flight) {
        flight.$remove();

        for (var i in $scope.flights) {
          if ($scope.flights[i] === flight) {
            $scope.flights.splice(i, 1);
          }
        }
      } else {
        $scope.flight.$remove(function () {
          $location.path('flights');
        });
      }
    };

    // Update existing flight
    $scope.update = function () {
      var flight = $scope.flight;

      flight.$update(function () {
        $location.path('flights/' + flight._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of flights
    $scope.find = function () {
      $scope.flights = Flights.query();
    };

    // Find existing flight
    $scope.findOne = function () {
      $scope.flight = Flights.get({
        flightId: $stateParams.flightId
      });
    };
  }
]);
