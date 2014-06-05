'use strict';
var Logfire = require('logfire-client');
var client = new Logfire('http://localhost:8085');

/**
 * Get the amount of `cache.hit` and `cache.miss` events in the past
 * 60 minutes grouped by `file_type` where `file_type` is not `html`,
 * `css` or `js`.
 */
client.query.query({
  events: ['cache.hit', 'cache.miss'],
  select: ['$count'],
  group: 'file_type',
  start: new Date(Date.now() - (60 * 60 * 1000)),
  where: {
    file_type: {
      $nin: ['html', 'css', 'js']
    }
  }
}).then(function(result) {
  console.log('Got some results:');
  console.log(result);
}).catch(function (e) {
  console.log('Querying failed:', e.message);
});
