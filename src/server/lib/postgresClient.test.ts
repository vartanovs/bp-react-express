import * as pg from 'pg';

import postgresClient from './postgresClient';
import { POSTGRES_MESSAGES } from './constants';

describe('server/lib/postgresClient', () => {
  let consoleLogSpy: jasmine.Spy;
  let consoleErrorSpy: jasmine.Spy;

  let mockPgPool: pg.Pool;
  let mockPgPoolClient: pg.PoolClient;

  const mockError = new Error('mock error');
  const mockNoParameterQueryString = 'SELECT * from table;';
  const mockParameterQueryString = 'SELECT * from $1;';
  const mockQueryParameters = ['mockTable'];
  const mockQueryResponse = { mock: "data" };

  beforeAll(async () => {
    mockPgPool = new pg.Pool();
    mockPgPoolClient = await mockPgPool.connect();
  });

  describe('this.client.on()', () => {
    beforeEach(() => {
      consoleLogSpy = spyOn(console, 'log').and.callFake(() => {});
      consoleErrorSpy = spyOn(console, 'error').and.callFake(() => {});
    });

    it('Logs a message when connected', async () => {
      mockPgPool.emit('connect');
      expect(consoleLogSpy).toHaveBeenCalledWith(POSTGRES_MESSAGES.CONNECT);
    });

    it('Logs an error when an error is emitted by the client', async() => {
      mockPgPool.emit('error', mockError);
      expect(consoleErrorSpy).toHaveBeenCalledWith(POSTGRES_MESSAGES.ERROR, mockError);
    });
  });

  describe('.query()', () => {
    beforeEach(() => {
      spyOn(mockPgPoolClient, 'query').and.callFake(() => Promise.resolve(mockQueryResponse));
    });

    it('connects to the pool, calls the .query method then releases the connection', async () => {
      await expect(postgresClient.query(mockNoParameterQueryString)).resolves.toEqual(mockQueryResponse);
      expect(mockPgPoolClient.query).toHaveBeenCalledWith(mockNoParameterQueryString);
      expect(mockPgPoolClient.release).toHaveBeenCalled();
    });

    it('connects and releases if query is called with two arguments', async () => {
      await expect(postgresClient.query(mockParameterQueryString, mockQueryParameters)).resolves.toEqual(mockQueryResponse);
      expect(mockPgPoolClient.query).toHaveBeenCalledWith(mockParameterQueryString, mockQueryParameters);
      expect(mockPgPoolClient.release).toHaveBeenCalled();
    });
  });
});
