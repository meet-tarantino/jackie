const express = require('express');
const bunyanExpress = require('express-bunyan-logger');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const mongo = require('mongodb');

function startServer(config, log) {
  const app = express();
  const db = mongo.connect(config.mongo.url, { promiseLibrary: Promise });

  app.use(bodyParser.json());

  app.use(bunyanExpress({
    logger: log,
    excludes: ['body', 'short-body', 'req-headers', 'res-headers', 'incoming'],
    format: ':res[statusCode] :method :url'
  }));

  app.get('/movies', (req, res) => {
    const query = {};
    db.then(db => db.collection('movies').find(query).toArray())
      .then(res => {
        if (!res) {
          return [];
        }
        return res;
      })
      .then(data => {
        res.json(data);
      });
  });

  app.post('/add-movie', (req, res) => {
    const movie = req.body;
    db.then(db => db.collection('movies').insertOne(movie))
      .then(res => res.result)
      .then(data => {
        if (data.ok === 1) {
          return res.sendStatus(201);
        }
        res.sendStatus(500);
      });
  });

  app.listen(config.port, () => {
    log.info(`${config.name} server started: listening on port ${config.port}`);
  });

}

module.exports = startServer;
