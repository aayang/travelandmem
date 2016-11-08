'use strict';

/**
 * Module dependencies.
 */
// var app = require('./config/lib/app');
// var server = app.start();

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var app = express();
 
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/local');
app.use(express.static(__dirname + '/build'));
 
app.use(bodyparser.json({limit:'50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
 
require('./routes/admin-routes')(app);
 
var server = http.createServer(app);
 
var port = process.env.PORT || 3000;
app.listen(port, function() {
console.log("Listening on " + port);



// var express = require("express");
// var path = require("path");
// var bodyParser = require("body-parser");
// var mongodb = require("mongodb");
// var ObjectID = mongodb.ObjectID;

// var CONTACTS_COLLECTION = "contacts";

// var app = express();
// app.use(express.static(__dirname + "/public"));
// app.use(bodyParser.json());

// // Create a database variable outside of the database connection callback to reuse the connection pool in your app.
// var db;

// // Connect to the database before starting the application server.
// mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }

//   // Save database object from the callback for reuse.
//   db = database;
//   console.log("Database connection ready");

//   // Initialize the app.
//   var server = app.listen(process.env.PORT || 8080, function () {
//     var port = server.address().port;
//     console.log("App now running on port", port);
//   });
// });
