'use strict';

(function () {
  // Flights Controller Spec
  describe('Flights Controller Tests', function () {
    // Initialize global variables
    var FlightsController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      Flights,
      mockFlight;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _Flights_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      Flights = _Flights_;

      // create mock flight
      mockFlight = new Flights({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'An Flight about MEAN',
        content: 'MEAN rocks!'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the flights controller.
      FlightsController = $controller('FlightsController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one flight object fetched from XHR', inject(function (Flights) {
      // Create a sample flights array that includes the new flight
      var sampleFlights = mockFlight;

      // Set GET response
      $httpBackend.expectGET('api/flights').respond(sampleFlights);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.flights).toEqualData(sampleFlights);
    }));

    it('$scope.findOne() should create an array with one flight object fetched from XHR using a flightId URL parameter', inject(function (Flights) {
      // Set the URL parameter
      $stateParams.flightId = mockFlight._id;

      // Set GET response
      $httpBackend.expectGET(/api\/flights\/([0-9a-fA-F]{24})$/).respond(mockFlight);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.flight).toEqualData(mockFlight);
    }));

    describe('$scope.craete()', function () {
      var sampleFlightPostData;

      beforeEach(function () {
        // Create a sample flight object
        sampleFlightPostData = new Flights({
          title: 'An Flight about MEAN',
          content: 'MEAN rocks!'
        });

        // Fixture mock form input values
        scope.title = 'An flight about MEAN';
        scope.content = 'MEAN rocks!';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (flights) {
        // Set POST response
        $httpBackend.expectPOST('api/flights', sampleFlightPostData).respond(mockFlight);

        // Run controller functionality
        scope.createFlight();
        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.title).toEqual('');
        expect(scope.content).toEqual('');

        // Test URL redirection after the flight was created
        expect($location.path.calls.mostRecent().args[0]).toBe('flights/' + mockFlight._id);
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/flights', sampleFlightPostData).respond(400, {
          message: errorMessage
        });

        scope.createFlight();
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock flight in scope
        scope.flight = mockFlight;
      });

      it('should update a valid flight', inject(function (Flights) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/flights\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.update();
        $httpBackend.flush();

        // Test URL location to new object
        expect($location.path()).toBe('/flights/' + mockFlight._id);
      }));

      it('should set scope.error to error response message', inject(function (Flights) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/flights\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.update();
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.removeFlight(flight)', function () {
      beforeEach(function () {
        // Create new flights array and include the flight
        scope.flights = [mockFlight, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/flights\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.removeFlight(mockFlight);
      });

      it('should send a DELETE request with a valid flightId and remove the flight from the scope', inject(function (Flights) {
        expect(scope.flights.length).toBe(1);
      }));
    });

    describe('scope.removeFlight()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.flight = mockFlight;

        $httpBackend.expectDELETE(/api\/flights\/([0-9a-fA-F]{24})$/).respond(204);

        scope.removeFlight();
        $httpBackend.flush();
      });

      it('should redirect to flights', function () {
        expect($location.path).toHaveBeenCalledWith('flights');
      });
    });
  });
}());
