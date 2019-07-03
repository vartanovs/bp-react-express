/**
 * @module __mocks__/ioredis.ts
 * @description Redis Automock
 */

import { EventEmitter } from 'events';

interface MockRedis extends EventEmitter {
  get?: any;
  incr?: any;
  incrby?: any;
  set?: any;
}

const mockRedis: MockRedis = new EventEmitter();
mockRedis.get = jest.fn();
mockRedis.incr = jest.fn();
mockRedis.incrby = jest.fn();
mockRedis.set = jest.fn();

const Redis = jest.fn().mockImplementation(() => mockRedis);

export = Redis;
