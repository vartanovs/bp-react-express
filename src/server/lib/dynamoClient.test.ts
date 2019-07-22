import * as AWS from 'aws-sdk';

import dynamoClient from './dynamoClient';

describe('server/lib/dynamoClient', () => {
  let mockDynamo: AWS.DynamoDB;

  const mockTableName = 'MockTable';
  const mockAttribute = { AttributeName: "Mock", AttributeType: "S" };
  const mockSchema = { AttributeName: "Mock", KeyType: "HASH" };

  const mockPutItem = {Mock: { "S": 'data' } };

  const mockListTablesResponse = { TableNames: [ mockTableName ] };
  const mockTableResponse = { TableDescription: { TableName: mockTableName } };
  const mockScanResponse = { Items: [ mockPutItem ], Count: 1 };

  const mockEnv = {
    AWS_DEFAULT_REGION: 'mock-region',
    AWS_ACCESS_KEY_ID: 'mock-key',
    AWS_SECRET_ACCESS_KEY: 'mock-secret',
    AWS_DYNAMO_ENDPOINT: 'http://mock-endpoint',
  };

  const mockConfig = {
    region: mockEnv.AWS_DEFAULT_REGION,
    accessKeyId: mockEnv.AWS_ACCESS_KEY_ID,
    secretAccessKey: mockEnv.AWS_SECRET_ACCESS_KEY,
    endpoint: mockEnv.AWS_DYNAMO_ENDPOINT,
  };

  beforeAll(() => {
    mockDynamo = new AWS.DynamoDB();
  });

  describe('.init()', () => {
    beforeEach(() => {
      process.env = mockEnv;
      process.env.NODE_ENV = 'test';
    });

    it('Creates a new client using local configuration', async () => {
      await dynamoClient.init();
      expect(AWS.DynamoDB).toHaveBeenCalledWith(mockConfig);
    });

    it('Creates a new client in production environment', async () => {
      process.env.NODE_ENV = 'production';
      await dynamoClient.init();
      expect(AWS.DynamoDB).toHaveBeenCalledTimes(1);
    });
  });

  describe('.createTable()', () => {
    beforeEach(() => {
      spyOn(mockDynamo, 'createTable').and.callFake(() => ({ promise: () => Promise.resolve(mockTableResponse) }));
    });

    it('Calls the AWS.DynamoDB createTable method and returns the result', async () => {
      await expect(dynamoClient.createTable(mockTableName, [mockAttribute], [mockSchema])).resolves.toEqual(mockTableResponse);
      expect(mockDynamo.createTable).toHaveBeenCalledTimes(1);
    });
  });

  describe('.deleteTable()', () => {
    beforeEach(() => {
      spyOn(mockDynamo, 'deleteTable').and.callFake(() => ({ promise: () => Promise.resolve(mockTableResponse) }));
    });

    it('Calls the AWS.DynamoDB deleteTable method and returns the result', async () => {
      await expect(dynamoClient.deleteTable(mockTableName)).resolves.toEqual(mockTableResponse);
      expect(mockDynamo.deleteTable).toHaveBeenCalledTimes(1);
    });
  });

  describe('.getAll()', () => {
    beforeEach(() => {
      spyOn(mockDynamo, 'scan').and.callFake(() => ({ promise: () => Promise.resolve(mockScanResponse) }));
    });

    it('Calls the AWS.DynamoDB scan method and returns the result', async () => {
      await expect(dynamoClient.getAll(mockTableName)).resolves.toEqual(mockScanResponse);
      expect(mockDynamo.scan).toHaveBeenCalledTimes(1);
    });
  });

  describe('.listTables()', () => {
    beforeEach(() => {
      spyOn(mockDynamo, 'listTables').and.callFake(() => ({ promise: () => Promise.resolve(mockListTablesResponse) }));
    });

    it('Calls the AWS.DynamoDB listTables method and returns the result', async () => {
      await expect(dynamoClient.listTables()).resolves.toEqual(mockListTablesResponse);
      expect(mockDynamo.listTables).toHaveBeenCalledTimes(1);
    });
  });

  describe('.putItem()', () => {
    it('Calls the AWS.DynamoDB putItem method and returns the result', async () => {
      await expect(dynamoClient.putItem(mockTableName, mockPutItem)).resolves.toEqual({});
      expect(mockDynamo.putItem).toHaveBeenCalledTimes(1);
    });
  });
});