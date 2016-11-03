/**
 * Created by aayang on 10/26/16.
 */
'use strict';

angular.module('planner').config(['$stateProvider',
    function($stateProvider){
        $stateProvider
            .state('planner', {
                abstract: true,
                url: '/planner',
                template: '<ui-view/>',
                data: {
                    roles: ['user', 'admin']
                }
            })

            .state('planner.view', {
                url: '',
                templateUrl: 'modules/planner/view/planner-home.client.view.html'
            })

            .state('planner.extra', {
                url: '/extra',
                templateUrl: 'modules/planner/view/planner-extra.client.view.html'
            })

            .state('planner.flights', {
                url: '/flights',
                templateUrl: 'modules/planner/view/planner-flights.client.view.html'
            })

            .state('planner.hotels', {
                url: '/hotels',
                templateUrl: 'modules/planner/view/planner-hotels.client.view.html'
            })

            .state('planner.events', {
                url: '/events',
                templateUrl: 'modules/planner/view/planner-events.client.view.html'
            });
    }

]);
