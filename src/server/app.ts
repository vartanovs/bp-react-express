/**
 * @module server/app.ts
 * @description Server Declaration
 */

import * as path from 'path';
import * as express from 'express';

import dynamoClient from './lib/dynamoClient';
import mongoClient from './lib/mongoClient';
import postgresClient from './lib/postgresClient'; 
import redisClient from './lib/redisClient';

import { Request, Response } from 'express';
import { AttributeDefinition, KeySchemaElement } from 'aws-sdk/clients/dynamodb';

// Invoke Express Server
const app = express();

// Respond to GET Requests to root '/' by serving React Bundle
app.use(express.static(path.resolve(__dirname, '../../build')));

// GET /dynamo - test route for dynamo client
app.get('/dynamo',
  async(_: Request, res: Response) => {
    const timeStampAttribute: AttributeDefinition = { "AttributeName": "now", "AttributeType": "S" };
    const timestampSchema: KeySchemaElement = { "AttributeName": "now", "KeyType": "HASH" };
    await dynamoClient.createTable('TimeStamps', [timeStampAttribute], [timestampSchema]);
    await dynamoClient.putItem('TimeStamps', {"now": { "S": new Date().toISOString() } })
    const dynamoNow = await dynamoClient.getAll('TimeStamps')
    const listTableRes = await dynamoClient.listTables();
    console.log('List Tables', listTableRes);
    await dynamoClient.deleteTable('TimeStamps');
    res.send(dynamoNow.Items!.pop());
  })

// GET /mongo - test route for mongo client
app.get('/mongo',
  async(_: Request, res: Response) => {
    const client = await mongoClient;
    await client.deleteAll('timestamps');
    await client.insertOne('timestamps', { now: new Date().toISOString() });
    const mongoNow = await client.findAll('timestamps');
    res.send(mongoNow.pop());
  })

// GET /postgres - test route for postgres client
app.get('/postgres',
  async(_: Request, res: Response) => {
    const response = await postgresClient.query('SELECT NOW();');
    const postgresNow = response.rows.pop();
    res.send(postgresNow);
  })

// GET /redis - test route for redis client
app.get('/redis',
  async(_: Request, res: Response) => {
    redisClient.set('now', new Date().toISOString());
    const redisNow = await redisClient.get('now');
    res.send(redisNow);
  })

// Respond to all other requests with 404 status and 'route not found' message
app.use('*',
  (_: Request, res: Response): Response => res.status(404).send('Route Not Found!'));

export default app;
