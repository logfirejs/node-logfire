'use strict';
var TestHelpers = require('./test-helpers');
var Logfire = require('../lib/logfire-client');

var client, server;
client = new Logfire('http://localhost:8088');

describe('client.query', function() {
  before(function() {
    return TestHelpers.runServer()
      .then(function (_server) {
        server = _server;
      });
  });

  beforeEach(function () {
    return server.store.reset();
  });

  var id;
  beforeEach(function() {
    return client.events.create({
      event: 'cache.hit'
    }).then(function (response) {
      id = response.$id;
    });
  });

  describe('#query', function() {
    it('successfully runs the query and returns the result', function() {
      return client.query.query({
        events: ['cache.hit']
      }).then(function(response) {
        response[0].$id.should.equal(id);
      });
    });

    it('should return an error if it fails to run the query', function() {
      return client.query.query({
        events: ['foo.bar']
      }).catch(function(err) {
        err.message.should.equal('The event \"foo.bar\" does not exist.');
      });
    });
  });
});
