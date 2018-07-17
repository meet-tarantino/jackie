const config = require('./config');
const log = require('bunyan').createLogger(config.log);
const createServer = require('./server');
const Promise = require('bluebird');
const mongo = require('mongodb');
const db = mongo.connect(config.mongo.url, { promiseLibrary: Promise });

const server = createServer(config, log, db);
server.listen(config.port, () => {
  log.info(`${config.name} server started: listening on port ${config.port}`);
});