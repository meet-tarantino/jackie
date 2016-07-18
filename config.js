const appName = require('./package.json').name;
const bunyan = require('bunyan');

module.exports = require('rc')(appName, {
  name: appName,
  port: '8080',
  mongo: {
    url: 'mongodb://localhost:27017'
  },
  log: {
    name: appName,
    level: 'info',
    serializers: {
      req: bunyan.stdSerializers.req,
      res: bunyan.stdSerializers.res
    }
  }
});