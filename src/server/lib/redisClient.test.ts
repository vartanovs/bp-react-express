import * as Redis from 'ioredis';

import redisClient from './redisClient';
import { REDIS_MESSAGES } from './constants';

jest.mock('ioredis');

describe('server/lib/redisClient', () => {
  let consoleLogSpy: jasmine.Spy;
  let consoleErrorSpy: jasmine.Spy;

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
      await expect(redisClient.get(mockKey)).resolves.not.toThrowError();
      expect(mockRedis.get).toHaveBeenCalledWith(mockKey);
    });
  });

  describe('.increment()', () => {
    it('calls the .incr() method on the redis client when not given an increment value', async () => {
      await expect(redisClient.increment(mockKey)).resolves.not.toThrowError();
      expect(mockRedis.incr).toHaveBeenCalledWith(mockKey);

    });

    it('calls the .incrby() method on the redis client when given an increment value', async () => {
      await expect(redisClient.increment(mockKey, mockIncrementValue)).resolves.not.toThrowError();
      expect(mockRedis.incrby).toHaveBeenCalledWith(mockKey, mockIncrementValue);
    });
  });

  describe('.set()', () => {
    it('calls the .set() method on the redis client', async () => {
      await expect(redisClient.set(mockKey, mockValue)).resolves.not.toThrowError();
      expect(mockRedis.set).toHaveBeenCalledWith(mockKey, mockValue);
    });
  });
});