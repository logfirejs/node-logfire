'use strict';

var EventsClient = require('./events');
var QueryClient = require('./query');

var Promise = require('bluebird');
var request = require('request');
Promise.promisifyAll(request);

function LogfireClient(url, options) {
  this.url = url;
  this.options = options || {};

  this.events = new EventsClient(this);
  this.query = new QueryClient(this);
}

/**
 * Sends a request with the given method, path and POST data
 * @param  {String} method
 * @param  {String} path
 * @param  {Object} data
 * @return {Promise}
 * @public
 */
LogfireClient.prototype.request = function(method, path, data) {
  return request[method + 'Async'](this._buildURL(path), { json: data || true })
    .then(function (args) {
      var body = args[1];
      if (body.error) {
        throw new Error(body.error);
      }
      return body;
    });
};

/**
 * Builds the request URL
 * @param  {String} path
 * @return {String}
 * @public
 */
LogfireClient.prototype._buildURL = function(path) {
  var url = this.url + path;
  if (this.options.auth) {
    url += '?auth=' + this.options.auth;
  }
  return url;
};

module.exports = LogfireClient;
