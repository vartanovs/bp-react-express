/**
 * @module server/dynamoClient.ts
 * @description DynamoDB Connection
 */

import * as AWS from 'aws-sdk';
import * as path from 'path';

import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env/.env') });

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  region: process.env.AWS_DEFAULT_REGION as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
});

const dynamoClient = new AWS.DynamoDB();

export default dynamoClient;
