'use strict';

var Promise = require('bluebird');
var request = require('request');
Promise.promisifyAll(request);

function QueryClient(url) {
  this.url = url;
}

/**
 * Runs a query with the given options
 * @param  {Object} options
 * @return {Promise}
 * @public
 */
QueryClient.prototype.query = function(options) {
  return request.postAsync(this.url + '/query', { json: options })
    .then(function (args) {
      var body = args[1];
      if (body.error) {
        throw new Error(body.error);
      }
      return body;
    });
};

module.exports = QueryClient;
