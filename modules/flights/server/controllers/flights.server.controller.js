'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Flight = mongoose.model('Flight'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a flight
 */
exports.create = function (req, res) {
  var flight = new Flight(req.body);
  flight.user = req.user;

  flight.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(flight);
    }
  });
};

/**
 * Show the current flight
 */
exports.read = function (req, res) {
  res.json(req.flight);
};

/**
 * Update a flight
 */
exports.update = function (req, res) {
  var flight = req.flight;

  flight.departure = req.body.departure;
  flight.arrival = req.body.arrival;
  flight.description = req.body.description;

  flight.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(flight);
    }
  });
};

/**
 * Delete an flight
 */
exports.delete = function (req, res) {
  var flight = req.flight;

  flight.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(flight);
    }
  });
};

/**
 * List of flights
 */
exports.list = function (req, res) {
  Flight.find().sort('-created').populate('user', 'displayName').exec(function (err, flights) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(flights);
    }
  });
};

/**
 * flight middleware
 */
exports.flightByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Flight is invalid'
    });
  }

  Flight.findById(id).populate('user', 'displayName').exec(function (err, flight) {
    if (err) {
      return next(err);
    } else if (!flight) {
      return res.status(404).send({
        message: 'No flight with that identifier has been found'
      });
    }
    req.flight = flight;
    next();
  });
};
