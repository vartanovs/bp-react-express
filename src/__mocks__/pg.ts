/**
 * @module __mocks__/pg.ts
 * @description pg automock
 */

import { EventEmitter } from 'events';

const mockQuery = jest.fn(() => Promise.resolve() );
const mockRelease = jest.fn();

interface MockPostgresPoolClient {
  query(): Promise<void>;
  release(): void;
}

interface MockPostgresPool extends EventEmitter {
  connect?(key: string): Promise<MockPostgresPoolClient>;
}

const mockPgPoolClient: MockPostgresPoolClient = {
  query: mockQuery,
  release: mockRelease,
}

const mockPgPool: MockPostgresPool = new EventEmitter();
mockPgPool.connect = jest.fn(() => Promise.resolve(mockPgPoolClient));

const pg = {
  Pool: jest.fn().mockImplementation(() => mockPgPool)
}

export = pg;
