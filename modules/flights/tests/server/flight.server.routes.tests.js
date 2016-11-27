'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Flight = mongoose.model('Flight'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, flight;

/**
 * Flight routes tests
 */
describe('Flight CRUD tests', function () {
  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'password'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new flight
    user.save(function () {
      flight = {
        title: 'Flight Title',
        content: 'Flight Content'
      };

      done();
    });
  });

  it('should be able to save an flight if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new flight
        agent.post('/api/flights')
          .send(flight)
          .expect(200)
          .end(function (flightSaveErr, flightSaveRes) {
            // Handle flight save error
            if (flightSaveErr) {
              return done(flightSaveErr);
            }

            // Get a list of flights
            agent.get('/api/flights')
              .end(function (flightsGetErr, flightsGetRes) {
                // Handle flight save error
                if (flightsGetErr) {
                  return done(flightsGetErr);
                }

                // Get flights list
                var flights = flightsGetRes.body;

                // Set assertions
                (flights[0].user._id).should.equal(userId);
                (flights[0].title).should.match('Flight Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an flight if not logged in', function (done) {
    agent.post('/api/flights')
      .send(flight)
      .expect(403)
      .end(function (flightSaveErr, flightSaveRes) {
        // Call the assertion callback
        done(flightSaveErr);
      });
  });

  it('should not be able to save an flight if no title is provided', function (done) {
    // Invalidate title field
    flight.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new flight
        agent.post('/api/flights')
          .send(flight)
          .expect(400)
          .end(function (flightSaveErr, flightSaveRes) {
            // Set message assertion
            (flightSaveRes.body.message).should.match('Title cannot be blank');

            // Handle flight save error
            done(flightSaveErr);
          });
      });
  });

  it('should be able to update an flight if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new flight
        agent.post('/api/flights')
          .send(flight)
          .expect(200)
          .end(function (flightSaveErr, flightSaveRes) {
            // Handle flight save error
            if (flightSaveErr) {
              return done(flightSaveErr);
            }

            // Update flight title
            flight.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing flight
            agent.put('/api/flights/' + flightSaveRes.body._id)
              .send(flight)
              .expect(200)
              .end(function (flightUpdateErr, flightUpdateRes) {
                // Handle flight update error
                if (flightUpdateErr) {
                  return done(flightUpdateErr);
                }

                // Set assertions
                (flightUpdateRes.body._id).should.equal(flightSaveRes.body._id);
                (flightUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of flights if not signed in', function (done) {
    // Create new flight model instance
    var flightObj = new Flight(flight);

    // Save the flight
    flightObj.save(function () {
      // Request flights
      request(app).get('/api/flights')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single flight if not signed in', function (done) {
    // Create new flight model instance
    var flightObj = new Flight(flight);

    // Save the flight
    flightObj.save(function () {
      request(app).get('/api/flights/' + flightObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', flight.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single flight with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/flights/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Flight is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single flight which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent flight
    request(app).get('/api/flights/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No flight with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an flight if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new flight
        agent.post('/api/flights')
          .send(flight)
          .expect(200)
          .end(function (flightSaveErr, flightSaveRes) {
            // Handle flight save error
            if (flightSaveErr) {
              return done(flightSaveErr);
            }

            // Delete an existing flight
            agent.delete('/api/flights/' + flightSaveRes.body._id)
              .send(flight)
              .expect(200)
              .end(function (flightDeleteErr, flightDeleteRes) {
                // Handle flight error error
                if (flightDeleteErr) {
                  return done(flightDeleteErr);
                }

                // Set assertions
                (flightDeleteRes.body._id).should.equal(flightSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an flight if not signed in', function (done) {
    // Set flight user
    flight.user = user;

    // Create new flight model instance
    var flightObj = new Flight(flight);

    // Save the flight
    flightObj.save(function () {
      // Try deleting flight
      request(app).delete('/api/flights/' + flightObj._id)
        .expect(403)
        .end(function (flightDeleteErr, flightDeleteRes) {
          // Set message assertion
          (flightDeleteRes.body.message).should.match('User is not authorized');

          // Handle flight error error
          done(flightDeleteErr);
        });

    });
  });

  afterEach(function (done) {
    User.removeFlight().exec(function () {
      Flight.removeFlight().exec(done);
    });
  });
});
