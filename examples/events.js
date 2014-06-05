'use strict';
var Logfire = require('logfire-client');
var client = new Logfire('http://localhost:8085');

client.events.create({
  event: 'cache.hit',
  data: {
    file_type: 'html'
  }
}).then(function(id) {
  console.log('Event created!');
  client.events.get(id)
    .then(function (event) {
      console.log(event);
    });
}).catch(function (e) {
  console.log('Event creation failed:', e.message);
});
