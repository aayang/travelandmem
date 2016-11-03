/**
 * Created by aayang on 10/26/16.
 */
'use strict';

angular.module('planner').controller('PlannerController', ['$scope', 'events', '$stateParams', '$location', 'Authentication',
    function ($scope, events, $stateParams, $location, Authentication) {
        $scope.authentication = Authentication;

        $scope.isNavCollapsed = true;
        $scope.isCollapsed = true;
        $scope.isCollapsedHorizontal = true;
        /*
        events.success(function(data){
          $scope.cityEvents = data;
        };*/
  }
])
