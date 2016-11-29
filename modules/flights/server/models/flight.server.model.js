'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Flight Schema
 */
var FlightSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  departure: {
    type: String,
    default: '',
    trim: true,
    required: 'Departure cannot be blank'
  },
  arrival: {
    type: String,
    default: '',
    trim: true,
    required: 'Arrival cannot be blank'
  },
  description: {
    type: String,
    default: '',
    trim: true,
    required: 'Description cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Flight', FlightSchema);
