const supertest = require('supertest');
const createServer = require('../server');
const mockLogger = require('bunyan').createLogger({ level: 'fatal', name: 'mocha' });

describe('server tests', () => {

  describe('health check', () => {
    let server;
    beforeEach(() => {
      server = createServer({}, mockLogger, null);
    });

    it('should respond with 200', () => {
      return supertest(server)
        .get('/health')
        .expect(200);
    });
  });
});