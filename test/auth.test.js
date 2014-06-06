'use strict';
var TestHelpers = require('./test-helpers');
var Logfire = require('../lib/logfire-client');

var client, server;
var createClient = function (auth) {
  client = new Logfire('http://localhost:8088', { auth: auth });
};

describe('authentication', function() {
  var runServer = function(auth) {
    before(function() {
      return TestHelpers.runServer({
          auth: auth
        })
        .then(function (_server) {
          server = _server;
        });
    });

    beforeEach(function () {
      return server.store.reset();
    });

    after(function() {
      return server.close();
    });
  };

  describe('when authentication is required', function() {
    describe('when not passing `auth`', function() {
      runServer('foobar');
      createClient(null);
      it('should fail', function() {
        return client.events.create({
          event: 'cache.hit',
          data: {
            file_type: 'html'
          }
        }).catch(function (err) {
          err.message.should.equal('Not authenticated.');
        });
      });
    });

    describe('when passing `auth`', function() {
      runServer('foobar');
      createClient('foobar');
      it('should succeed', function() {
        return client.events.create({
          event: 'cache.hit',
          data: {
            file_type: 'html'
          }
        }).then(function(response) {
          response.$id.should.equal(1);
        });
      });
    });
  });

  describe('when authentication is not required', function() {
    describe('when not passing `auth`', function() {
      runServer(null);
      createClient(null);
      it('should fail', function() {
        return client.events.create({
          event: 'cache.hit',
          data: {
            file_type: 'html'
          }
        }).catch(function (err) {
          err.message.should.equal('Not authenticated.');
        });
      });
    });

    describe('when passing `auth`', function() {
      runServer(null);
      createClient('foobar');
      it('should succeed', function() {
        return client.events.create({
          event: 'cache.hit',
          data: {
            file_type: 'html'
          }
        }).then(function(response) {
          response.$id.should.equal(1);
        });
      });
    });
  });
});
