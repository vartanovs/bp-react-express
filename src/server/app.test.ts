// Unit Testing for server/app.ts

// tslint:disable-next-line:no-var-requires
const request = require('supertest');

import app from './app';

describe(`GET '/'`, () => {
  it('responds with status code 200 and HTML', (done) => {
    request(app).get('/')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200, done);
  });
});

describe(`GET '/random'`, () => {
  it('responds with status code 404 and Route Not Found', (done) => {
    request(app).get('/random')
      .expect(404, 'Route Not Found!', done);
  });
});
