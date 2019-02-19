/**
 * @module server/dynamoClient.ts
 * @description DynamoDB Connection
 */

import * as AWS from 'aws-sdk';
import * as path from 'path';

import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env/.env') });

import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';

let dynamoClient: AWS.DynamoDB;

if (process.env.NODE_ENV === 'production') {
  // In production, connect DynamoDB Client to cloud-hosted AWS DB
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    region: process.env.AWS_DEFAULT_REGION as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  });
  dynamoClient = new AWS.DynamoDB();
} else {
  // In development or testing, connect DynamoDB Client to local Dockerized DB
  const serviceConfigOptions: ServiceConfigurationOptions = {
    endpoint: 'http://ern-boilerplate-dynamo:8000',
    region: process.env.AWS_DEFAULT_REGION as string,
  };
  dynamoClient = new AWS.DynamoDB(serviceConfigOptions);
}

export default dynamoClient;
