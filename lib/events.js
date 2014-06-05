'use strict';

var Promise = require('bluebird');
var request = require('request');
Promise.promisifyAll(request);

function EventsClient(url) {
  this.url = url;
}

/**
 * Creates an event with the given options
 * @param  {Object} options
 * @return {Promise}
 * @public
 */
EventsClient.prototype.create = function(options) {
  return request.postAsync(this.url + '/events', { json: options })
    .then(function (args) {
      var body = args[1];
      if (body.error) {
        throw new Error(body.error);
      }
      return body;
    });
};

module.exports = EventsClient;