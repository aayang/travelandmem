'use strict';

/**
 * Module dependencies.
 */
var travelPlanPolicy = require('../policies/planner.server.policy'),
  travelPlan = require('../controllers/planner.server.controller');

module.exports = function (app) {
  // travelPlan collection routes
  app.route('/api/travelPlan').all(travelPlanPolicy.isAllowed)
    .get(travelPlan.list)
    .post(travelPlan.create);

  // Single travelPlan routes
  app.route('/api/travelPlan/:travelPlanId').all(travelPlanPolicy.isAllowed)
    .get(travelPlan.read)
    .put(travelPlan.update)
    .delete(travelPlan.delete);

  // Finish by binding the travelPlan middleware
  app.param('travelPlanId', travelPlan.travelPlanByID);
};
