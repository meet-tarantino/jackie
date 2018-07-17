const config = require('./config');
const log = require('bunyan').createLogger(config.log);
const createServer = require('./server');
const Promise = require('bluebird');
const mongo = require('mongodb');
const db = mongo.connect(config.mongo.url, { promiseLibrary: Promise });

createServer(config, log, db)
  .listen(config.port, () => {
    log.info(`${config.name} server started: listening on port ${config.port}`);
  });