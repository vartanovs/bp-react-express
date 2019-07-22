const mockDynamo = {
  createTable: jest.fn(() => ({ promise: () => Promise.resolve() })),
  deleteTable: jest.fn(() => ({ promise: () => Promise.resolve() })),
  listTables: jest.fn(() => ({ promise: () => Promise.resolve() })),
  putItem: jest.fn(() => ({ promise: () => Promise.resolve({}) })),
  scan: jest.fn(() => ({ promise: () => Promise.resolve() })),
}

const mockAWS = {
  DynamoDB: jest.fn().mockImplementation(() => mockDynamo),
};

export = mockAWS;
