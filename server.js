const express = require('express');
const bunyanExpress = require('express-bunyan-logger');
const bodyParser = require('body-parser');

function createServer(config, log, db) {
  const app = express();

  app.use(bodyParser.json());

  app.use(bunyanExpress({
    logger: log,
    excludes: ['body', 'short-body', 'req-headers', 'res-headers', 'incoming'],
    format: ':res[statusCode] :method :url'
  }));

  app.get('/health', (req, res) => {
    res.sendStatus(200);
  });

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


  return app;
}

module.exports = createServer;
