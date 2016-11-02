/**
 * Created by aayang on 10/26/16.
 */

'use strict';
// Configuring the Planner module
angular.module('planner').run(['Menus',
    function (Menus) {
        // Add the articles dropdown item
        Menus.addMenuItem('topbar', {
            title: 'Travel Planner',
            state: 'planner.view'
        });

        // Add the articles dropdown item
        Menus.addMenuItem('topbar', {
            title: 'Extra',
            state: 'planner.extra'
        });

        Menus.addMenuItem('topbar', {
            title: 'Flights',
            state: 'planner.flights'
        });

        Menus.addMenuItem('topbar', {
            title: 'Events',
            state: 'planner.events'
        });
    }
]);
