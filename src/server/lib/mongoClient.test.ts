import mongoClientInit from './mongoClient';

import * as mongodb from 'mongodb';
import { MONGO_MESSAGES } from './constants';

jest.mock('mongodb');

describe('server/lib/mongoClient', () => {
  let consoleLogSpy: jasmine.Spy;
  let consoleErrorSpy: jasmine.Spy;

  let mockMongo: any

  let mongoClient: any;
  let mongoCollection: any;

  const mockError = new Error('mock error');

  beforeAll(async () => {
    mockMongo = await mongodb.MongoClient.connect('');
    mongoClient = await mongoClientInit;
    mongoCollection = mockMongo.db().collection();
  })

  describe('this.client.on()', () => {
    beforeEach(() => {
      consoleLogSpy = spyOn(console, 'log').and.callFake(() => {});
      consoleErrorSpy = spyOn(console, 'error').and.callFake(() => {});
    });

    it('Logs a message when connected', async () => {
      mockMongo.emit('connect');
      expect(consoleLogSpy).toHaveBeenCalledWith(MONGO_MESSAGES.CONNECT);
    });

    it('Logs an error when an error is emitted by the client', async() => {
      mockMongo.emit('error', mockError);
      expect(consoleErrorSpy).toHaveBeenCalledWith(MONGO_MESSAGES.ERROR, mockError);
    });
  });

  describe('.deleteAll()', () => {
    it('calls the .deleteMany() method on the mongo client', async () => {
      await expect(mongoClient.deleteAll('hi')).resolves.not.toThrowError();
      expect(mongoCollection.deleteMany).toHaveBeenCalled();
    });
  });

  describe('.findAll()', () => {
    it('calls the .find() method on the mongo client', async () => {
      await expect(mongoClient.findAll('hi')).resolves.not.toThrowError();
      expect(mongoCollection.find).toHaveBeenCalled();
    });
  });
});
