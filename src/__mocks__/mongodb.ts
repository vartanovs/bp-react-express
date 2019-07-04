/**
 * @module __mocks__/mongodb.ts
 * @description mongodb automock
 */

import { EventEmitter } from 'events';

interface MockMongo extends EventEmitter {
  db?(dbName: string): {
    collection(): {
      deleteMany: any;
      insertMany: any;
      insertOne: any;
      find: any;
    };
  };
}

const mockMongoDB = {
  collection: jest.fn(() => mockMongoCollection),
}

const mockMongoCollection = {
  deleteMany: jest.fn(() => ({ result: 'mockVal' })),
  insertMany: jest.fn(<T>(items: T[]) => Promise.resolve({ ops: items })),
  insertOne: jest.fn(<T>(item: T) => Promise.resolve({ ops: [item] })),
  find: jest.fn(() => ({ toArray: jest.fn() })),
}

const mockMongo: MockMongo = new EventEmitter();
mockMongo.db = jest.fn(() => mockMongoDB);

const mongodb = { MongoClient: { connect: () => Promise.resolve(mockMongo) } };

export = mongodb;
