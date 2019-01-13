/**
 * @module server/redisClient.ts
 * @description Redis Connection
 */

import * as path from 'path';
import * as redis from 'redis';

import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env/.env') });

// Extract Redis Client configuration from .env
const host: string = process.env.REDIS_HOST as string;
const port: number = Number(process.env.REDIS_PORT as string);

// Create new Redis Client
const redisClient = redis.createClient({
  host,
  port,
});

// Log Successful Connection or Error
redisClient.on('ready', () => console.log('Connected To Redis Data Store'));
redisClient.on('error', (err: Error) => console.error('Redis Error: ', err));

export default redisClient;
