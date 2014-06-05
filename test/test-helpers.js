'use strict';

var path = require('path');
var LogfireServer = require('logfire');
var TestHelpers = {};

/**
 * Initializes a logfire server instance
 * @return {Promise}
 */
TestHelpers.runServer = function(additionalConfig) {
  if (!additionalConfig) additionalConfig = {};

  var config = require(path.resolve(process.cwd(), 'test/logfire.json'));
  config = _.extend(config, additionalConfig);

  var logfire = new LogfireServer({
    port: 8088,
    config: config
  });
  return logfire.run()
    .then(function () {
      return logfire;
    });
};

module.exports = TestHelpers;
