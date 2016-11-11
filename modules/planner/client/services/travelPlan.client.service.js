/**
 * Created by aaronyang on 11/10/16.
 */
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('planner').factory('TravelPlan', ['$resource',
    function ($resource) {
        return $resource('api/travelPlan/:travelPlanId', {
            travelPlanId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
