/**
 * Created by aaronyang on 11/7/16.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var TravelPlanSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },

    created: {
        type: Date,
        default: Date.now
    },

    edited:{
        type: Date,
        default: Date.now
    },

    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },

    description: {
        type: String,
        default: '',
        trim: true
    },

    date: {
        type: Date,
        default: Date.now,
        required: "Please specify date"
    }
});

mongoose.model('TravelPlan', TravelPlanSchema);