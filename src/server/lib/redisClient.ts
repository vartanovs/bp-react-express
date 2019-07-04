/**
 * @module server/redisClient.ts
 * @description Redis Client
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import * as Redis from 'ioredis';

import { REDIS_MESSAGES } from './constants';

dotenv.config({ path: path.resolve(__dirname, '../../.env/.env') });

class RedisClient {
  private config: Redis.RedisOptions = {};
  private client: Redis.Redis|undefined;

  public init() {
    // Extract postgres configuration from .env
    this.config.host = process.env.REDIS_HOST;
    this.config.port = Number(process.env.REDIS_PORT);

    // Log Successful Connection or Error
    this.client = new Redis(this.config);
    this.client.on('connect', () => console.log(REDIS_MESSAGES.CONNECT));
    this.client.on('ready', () => console.log(REDIS_MESSAGES.READY));
    this.client.on('reconnecting', () => console.log(REDIS_MESSAGES.RECONNECT));

    this.client.on('close', () => console.log(REDIS_MESSAGES.CLOSE));
    this.client.on('error', (err: Error) => console.error(REDIS_MESSAGES.ERROR, err));
    
    return this;
  }

  public async get(key: string) {
    return await this.client!.get(key);
  }

  public async increment(key: string, amount = 1) {
    return await amount === 1 ? this.client!.incr(key) : this.client!.incrby(key, amount);
  }

  public async set(key: string, val: any) {
    return await this.client!.set(key, val);
  }
}

// Instantiate and initialize client then export instance
const redisClient = new RedisClient().init();

export default redisClient;
