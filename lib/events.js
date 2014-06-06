'use strict';

function EventsClient(client) {
  this.client = client;
}

/**
 * Returns the event with the given id
 * @param  {Number} id
 * @return {Promise}
 * @public
 */
EventsClient.prototype.get = function(id) {
  return this.client.request('get', '/events/' + id);
};

/**
 * Creates an event with the given options
 * @param  {Object} options
 * @return {Promise}
 * @public
 */
EventsClient.prototype.create = function(options) {
  return this.client.request('post', '/events', options);
};

module.exports = EventsClient;
