'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  TravelPlan = mongoose.model('TravelPlan'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a travelPlan
 */
exports.create = function (req, res) {
  var travelPlan = new TravelPlan(req.body);
  travelPlan.user = req.user;

  console.log(travelPlan);

  travelPlan.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err),
      });
    } else {
      res.json(travelPlan);
    }
  });
};

/**
 * Show the current travelPlan
 */
exports.read = function (req, res) {
  res.json(req.travelPlan);
};

/**
 * Update a travelPlan
 */
exports.update = function (req, res) {
  var travelPlan = req.travelPlan;

  travelPlan.title = req.body.title;
  travelPlan.description = req.body.description;
  travelPlan.edited = Date.now();

  travelPlan.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(travelPlan);
    }
  });
};

/**
 * Delete an travelPlan
 */
exports.delete = function (req, res) {
  var travelPlan = req.travelPlan;

  travelPlan.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(travelPlan);
    }
  });
};

/**
 * List of travelPlans
 */
exports.list = function (req, res) {
  TravelPlan.find({'user': req.user.id}).sort('-created').populate('user', 'displayName').exec(function (err, travelPlans) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(travelPlans);
    }
  });
};

/**
 * travelPlan middleware
 */
exports.travelPlanByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'travelPlan is invalid'
    });
  }

  TravelPlan.findById(id).populate('user', 'displayName').exec(function (err, travelPlan) {
    if (err) {
      return next(err);
    } else if (!travelPlan) {
      return res.status(404).send({
        message: 'No travelPlan with that identifier has been found'
      });
    }
    req.travelPlan = travelPlan;
    next();
  });
};
