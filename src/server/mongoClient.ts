/**
 * @module server/mongoClient.ts
 * @description MongoDB Connection
 */

import * as mongodb from 'mongodb';
import * as path from 'path';

import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env/.env') });

// Extract Mongo Client configuration from .env
const username: string = process.env.MONGO_USERNAME as string;
const password: string = process.env.MONGO_PASSWORD as string;
const host: string = process.env.MONGO_HOST as string;
const port: string = process.env.MONGO_PORT as string;
const uri: string = `mongodb://${username}:${password}@${host}:${port}`;

// Create new Mongo Client
const mongoClient = new mongodb.MongoClient(uri);

// Log Successful Connection or Error
mongoClient.connect((err) => {
  if (err) return console.error('MongoDB Error: ', err);
  console.log('Connected To MongoDB');
});

export default mongoClient;
