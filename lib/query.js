'use strict';

function QueryClient(client) {
  this.client = client;
}

/**
 * Runs a query with the given options
 * @param  {Object} options
 * @return {Promise}
 * @public
 */
QueryClient.prototype.query = function(options) {
  return this.client.request('post', '/query', options);
};

module.exports = QueryClient;
