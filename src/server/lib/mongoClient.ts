/**
 * @module server/mongoClient.ts
 * @description MongoDB Client
 */

import * as dotenv from 'dotenv';
import * as mongodb from 'mongodb';
import * as path from 'path';

import { MONGO_MESSAGES } from './constants';

dotenv.config({ path: path.resolve(__dirname, '../../../.env/.env') });

class MongoClient {
  // private config: mongodb.MongoClientOptions = {};
  private client: mongodb.MongoClient|undefined;
  private db: mongodb.Db|undefined;
  private dbName: string|undefined;
  private uri: string|undefined;

  public async init() {
      // Extract mongo configuration from .env
      const user = process.env.MONGO_INITDB_ROOT_USERNAME;
      const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
      const host = process.env.MONGO_HOST;
      const port = Number(process.env.MONGO_PORT);
      this.dbName = process.env.MONGO_INITDB_DATABASE;
      this.uri = `mongodb://${user}:${password}@${host}:${port}`;

      // Create new Mongo Client and DB
      this.client = await mongodb.MongoClient.connect(this.uri)
      this.db = this.client.db(this.dbName);

      this.client.on('connect', () => console.log(MONGO_MESSAGES.CONNECT));
      this.client.on('error', (err: Error) => console.error(MONGO_MESSAGES.ERROR, err));

      return this;
  }

  public async deleteAll(collectionName: string) {
    const deletedItems = await this.db!.collection(collectionName).deleteMany({});
    return deletedItems.result;
  }

  public async insertOne<T>(collectionName: string, item: T) {
    const insertedItem = await this.db!.collection(collectionName).insertOne(item);
    return insertedItem.ops;
  }

  public async insertMany<T>(collectionName: string, items: T[])  {
    const insertedItems = await this.db!.collection(collectionName).insertMany(items);
    return insertedItems.ops;
  }

  public async findAll(collectionName: string) {
    const foundItems = await this.db!.collection(collectionName).find({}).toArray();
    return foundItems;
  }
}

// Instantiate and initialize client then export instance
const mongoClient = new MongoClient().init();
export default mongoClient;
