import * as Redis from 'ioredis';

import redisClient from './redisClient';
import { REDIS_MESSAGES } from './constants';

describe('server/lib/redisClient', () => {
  let consoleLogSpy: jasmine.Spy;
  let consoleErrorSpy: jasmine.Spy;

  const mockCount = 2;
  const mockIncrementValue = 5;
  const mockKey = 'key';
  const mockValue = 'value';

  const mockError = new Error('mock error');
  const mockRedis = new Redis();

  describe('this.client.on()', () => {
    beforeEach(() => {
      consoleLogSpy = spyOn(console, 'log').and.callFake(() => {});
      consoleErrorSpy = spyOn(console, 'error').and.callFake(() => {});
    });

    it('Logs a message when connected', () => {
      mockRedis.emit('connect');
      expect(consoleLogSpy).toHaveBeenCalledWith(REDIS_MESSAGES.CONNECT);
    });

    it('Logs a message when ready', () => {
      mockRedis.emit('ready');
      expect(consoleLogSpy).toHaveBeenCalledWith(REDIS_MESSAGES.READY);
    });

    it('Logs a message when reconnecting', () => {
      mockRedis.emit('reconnecting');
      expect(consoleLogSpy).toHaveBeenCalledWith(REDIS_MESSAGES.RECONNECT);
    });

    it('Logs a message when closed', () => {
      mockRedis.emit('close');
      expect(consoleLogSpy).toHaveBeenCalledWith(REDIS_MESSAGES.CLOSE);
    });

    it('Logs an error when an error is emitted by the client', () => {
      mockRedis.emit('error', mockError);
      expect(consoleErrorSpy).toHaveBeenCalledWith(REDIS_MESSAGES.ERROR, mockError);
    });
  });

  describe('.get()', () => {
    it('calls the .get() method on the redis client', async () => {
      jest.spyOn(mockRedis, 'get').mockImplementation(() => Promise.resolve(mockValue));
      await expect(redisClient.get(mockKey)).resolves.toEqual(mockValue);
      expect(mockRedis.get).toHaveBeenCalledWith(mockKey);
    });
  });

  describe('.increment()', () => {
    it('calls the .incr() method on the redis client when not given an increment value', async () => {
      jest.spyOn(mockRedis, 'incr').mockImplementation(() => Promise.resolve(mockCount + 1));
      await expect(redisClient.increment(mockKey)).resolves.toEqual(mockCount + 1);
      expect(mockRedis.incr).toHaveBeenCalledWith(mockKey);

    });

    it('calls the .incrby() method on the redis client when given an increment value', async () => {
      jest.spyOn(mockRedis, 'incrby').mockImplementation(() => Promise.resolve(mockCount + mockIncrementValue));
      await expect(redisClient.increment(mockKey, mockIncrementValue)).resolves.toEqual(mockCount + mockIncrementValue);
      expect(mockRedis.incrby).toHaveBeenCalledWith(mockKey, mockIncrementValue);
    });
  });

  describe('.set()', () => {
    it('calls the .set() method on the redis client', async () => {
      jest.spyOn(mockRedis, 'set').mockImplementation(() => Promise.resolve(mockValue));
      await expect(redisClient.set(mockKey, mockValue)).resolves.toEqual(mockValue);
      expect(mockRedis.set).toHaveBeenCalledWith(mockKey, mockValue);
    });
  });
});