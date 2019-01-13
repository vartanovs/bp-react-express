/**
 * @module server/postgresClient.ts
 * @description PostgreSQL Connection
 */

import * as path from 'path';
import * as pg from 'pg';

import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env/.env') });

// Extract Mongo Client configuration from .env
const user: string = process.env.POSTGRES_USERNAME as string;
const password: string = process.env.POSTGRES_PASSWORD as string;
const host: string = process.env.POSTGRES_HOST as string;
const port: number = Number(process.env.POSTGRES_PORT as string);
const database: string = process.env.POSTGRES_DATABASE as string;

// Create new Postgres Client Pool
const postgresClient = new pg.Pool({
  database,
  host,
  password,
  port,
  user,
});

// Log Successful Connection or Error
postgresClient.on('connect', () => console.log('Connected To Postgres DB'));
postgresClient.on('error', (err: Error) => console.error('Postgres Error: ', err));

export default postgresClient;
