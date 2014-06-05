'use strict';
var TestHelpers = require('./test-helpers');
var Logfire = require('../lib/logfire-client');

var client, server;
client = new Logfire('http://localhost:8088');

before(function() {
  return TestHelpers.runServer()
    .then(function (_server) {
      server = _server;
    });
});

beforeEach(function () {
  return server.store.reset();
});

describe('client.events', function() {
  describe('#create', function() {
    it('successfully create an event and return the id', function() {
      return client.events.create({
        event: 'cache.hit',
        data: {
          file_type: 'html'
        }
      }).then(function(response) {
        response.$id.should.equal(1);
      });
    });

    it('should return an error if it fails to create an event', function() {
      return client.events.create({
        event: 'cache.hit',
        data: {
          foobar: 'baz'
        }
      }).catch(function(err) {
        err.message.should.equal('Field "foobar" for event "cache.hit" does not exist.');
      });
    });
  });
});
