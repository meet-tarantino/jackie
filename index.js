const config = require('./config');
const log = require('bunyan').createLogger(config.log);
const startServer = require('./server');

startServer(config, log);