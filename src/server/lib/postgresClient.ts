/**
 * @module server/postgresClient.ts
 * @description PostgreSQL Client
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import * as pg from 'pg';

import { PoolConfig } from 'pg';

dotenv.config({ path: path.resolve(__dirname, '../../.env/.env') });

class PostgresClient {
  private config: PoolConfig = {};
  private pool: pg.Pool|undefined;

  public init() {
    // Extract postgres configuration from .env
    this.config.user = process.env.POSTGRES_USER;
    this.config.password = process.env.POSTGRES_PASSWORD;
    this.config.host = process.env.POSTGRES_HOST;
    this.config.port = Number(process.env.POSTGRES_PORT);
    this.config.database = process.env.POSTGRES_DB;

    // Log Successful Connection or Error
    this.pool = new pg.Pool(this.config);
    this.pool.on('connect', () => console.log('Connected to Postgres DB'));
    this.pool.on('error', (err: Error) => console.error('Postgres DB Client Error: ', err));

    console.log('Postgres DB Client Configuration Complete');
    return this;
  }

  public async query(sqlStatement: string, sqlParams?: string[]) {
    const client = await this.pool!.connect();
    const response = sqlParams? await client.query(sqlStatement, sqlParams) : await client.query(sqlStatement);
    client.release();
    return response;
  }
}

// Instantiate and initialize pool then export instance
const postgresClient = new PostgresClient().init();
export default postgresClient;
