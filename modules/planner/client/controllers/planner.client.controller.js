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

function populateEvents($scope,$http) {
    var url = "/planner/client/event-data.json";
 
    $http.get(url).success( function(response) {
       $scope.events = response;
    });
}

/*global angular */
// (function (ng) {
//   'use strict';

//   var app = ng.module('ngLoadScript', []);

//   app.directive('script', function() {
//     return {
//       restrict: 'E',
//       scope: false,
//       link: function(scope, elem, attr) {
//         if (attr.type === 'text/javascript-lazy') {
//           var code = elem.text();
//           var f = new Function(code);
//           f();
//         }
//       }
//     };
//   });

// }(angular));
