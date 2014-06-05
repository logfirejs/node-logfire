'use strict';

var EventsClient = require('./events');
var QueryClient = require('./query');

function LogfireClient(url) {
  this.url = url;

  this.events = new EventsClient(url);
  this.query = new QueryClient(url);
}

module.exports = LogfireClient;
