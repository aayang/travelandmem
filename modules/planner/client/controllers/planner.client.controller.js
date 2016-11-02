/**
 * Created by aayang on 10/26/16.
 */
'use strict';

angular.module('planner').controller('PlannerController', ['$scope', '$stateParams', '$location', 'Authentication',
    function ($scope, $stateParams, $location, Authentication) {
        $scope.authentication = Authentication;

        $scope.isNavCollapsed = true;
        $scope.isCollapsed = true;
        $scope.isCollapsedHorizontal = true;
    }
]);
