import mongoClientInit from './mongoClient';

import * as mongodb from 'mongodb';
import { MONGO_MESSAGES } from './constants';

jest.mock('mongodb');

describe('server/lib/mongoClient', () => {
  let consoleLogSpy: jasmine.Spy;
  let consoleErrorSpy: jasmine.Spy;

  let mockMongo: mongodb.MongoClient;
  let mockMongoCollection: mongodb.Collection;

  let testMongoClient: any;

  const mockError = new Error('mock error');
  const mockCollection = 'mockCollection';
  const mockDb = 'mockDb';
  const mockItem = { mock: 'item' };
  const mockUrl = 'www.mock.url';

  beforeAll(async () => {
    mockMongo = await mongodb.MongoClient.connect(mockUrl);
    testMongoClient = await mongoClientInit;
    mockMongoCollection = mockMongo.db(mockDb).collection(mockCollection);
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
      await expect(testMongoClient.deleteAll('hi')).resolves.not.toThrowError();
      expect(mockMongoCollection.deleteMany).toHaveBeenCalled();
    });
  });

  describe('.findAll()', () => {
    it('calls the .find() method and its .toArray() method on the mongo client', async () => {
      await expect(testMongoClient.findAll(mockCollection)).resolves.not.toThrowError();
      expect(mockMongoCollection.find).toHaveBeenCalledWith({});
    });
  });

  describe('.insertOne()', () => {
    it('calls the .insertOne() method on the mongo client and returns the item inserted', async () => {
      await expect(testMongoClient.insertOne(mockCollection, mockItem)).resolves.toEqual([mockItem]);
      expect(mockMongoCollection.insertOne).toHaveBeenCalledWith(mockItem);
    });
  });

    describe('.insertMany()', () => {
    it('calls the .insertMany() method on the mongo client and returns the items inserted', async () => {
      await expect(testMongoClient.insertMany(mockCollection, [mockItem, mockItem])).resolves.toEqual([mockItem, mockItem]);
      expect(mockMongoCollection.insertMany).toHaveBeenCalledWith([mockItem, mockItem]);
    });
  });
});
