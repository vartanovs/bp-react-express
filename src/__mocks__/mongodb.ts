/**
 * @module __mocks__/mongodb.ts
 * @description Mongo Automock
 */

import { EventEmitter } from 'events';

interface MockMongo extends EventEmitter {
  db?: any;
}

const mockMongoDB = {
  collection: jest.fn(() => mockMongoCollection),
}

const mockMongoCollection = {
  deleteMany: jest.fn(() => ({ result: 'mockVal' })),
  insertMany: jest.fn(),
  insertOne: jest.fn(),
  find: jest.fn(() => ({ toArray: jest.fn() })),
}

const mockMongo: MockMongo = new EventEmitter();
mockMongo.db = jest.fn(() => mockMongoDB);

const mongodb = { MongoClient: { connect: () => Promise.resolve(mockMongo) } };

export = mongodb;
