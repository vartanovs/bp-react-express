/**
 * @module server/dynamoClient.ts
 * @description DynamoDB Client
 */

import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import * as path from 'path';

import { PutItemInput, PutItemInputAttributeMap, ScanInput, KeySchema, CreateTableInput, AttributeDefinitions, DeleteTableInput, ProvisionedThroughput } from 'aws-sdk/clients/dynamodb';

dotenv.config({ path: path.resolve(__dirname, '../../.env/.env') });

const defaultThroughput: ProvisionedThroughput = {
  "ReadCapacityUnits": 1,
  "WriteCapacityUnits": 1
}

class DynamoClient {
  private config: AWS.DynamoDB.ClientConfiguration = {};
  private client: AWS.DynamoDB|undefined;

  public init() {
    // Extract dynamo configuration from .env
    this.config.region = process.env.AWS_DEFAULT_REGION as string;
    this.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
    this.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;
    if (process.env.NODE_ENV !== 'production') this.config.endpoint = process.env.AWS_DYNAMO_ENDPOINT as string;
    this.client = new AWS.DynamoDB(this.config);

  return this;
  }

  public async createTable(tableName: string, attributeDefinitions: AttributeDefinitions, keySchema: KeySchema, provisionedThroughput = defaultThroughput) {
    const params: CreateTableInput = {
      TableName: tableName,
      AttributeDefinitions: attributeDefinitions,
      KeySchema: keySchema,
      ProvisionedThroughput: provisionedThroughput,
    }

    const response = await this.client!.createTable(params).promise();
    return response;
  }

  public async deleteTable(tableName: string) {
    const params: DeleteTableInput = {
      TableName: tableName,
    }
    await this.client!.deleteTable(params).promise();
  }

  public async listTables() {
    const response = await this.client!.listTables().promise();
    return response;
  }

  public async getAll(tableName: string) {
    const params: ScanInput = {
      TableName: tableName,
    };

    const response = await this.client!.scan(params).promise();
    return response;
  }

  public async putItem(tableName: string, item: PutItemInputAttributeMap) {
    const params: PutItemInput = {
      TableName: tableName,
      Item: item,
    };

    await this.client!.putItem(params).promise();
  }
};

// Instantiate and initialize client then export instance
const dynamoClient = new DynamoClient().init();
export default dynamoClient;
