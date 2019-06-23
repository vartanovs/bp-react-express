/**
 * @module server/redisClient.ts
 * @description Redis Connection
 */

import * as path from 'path';
import * as Redis from 'ioredis';

import * as dotenv from 'dotenv';
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
    this.client.on('close', () => console.log('Connection to Redis Server has Closed'));
    this.client.on('connect', () => console.log('Connected To Redis Server'));
    this.client.on('ready', () => console.log('Redis Cache Ready to Receive Commands'));
    this.client.on('reconnecting', () => console.log('Reconnected To Redis Server'));
    this.client.on('error', (err: Error) => console.error('Redis Error: ', err));
    
    return this;
  }

  public async get(key: string) {
    return await this.client!.get(key);
  }

  public async increment(key: string, amount = 1) {
    return await amount === 1 ? this.client!.incr(key) : this.client!.incrby(key, amount);
  }

  public async set(key: string, val: number|string|number[]|string[]) {
    return await this.client!.set(key, val);
  }
}

// Instantiate and initialize client then export instance
const redisClient = new RedisClient().init();

export default redisClient;
