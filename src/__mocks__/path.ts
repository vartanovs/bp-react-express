/**
 * @module __mocks__/path.ts
 * @description path automock
 */

const path = {
  join: jest.fn(),
  resolve: jest.fn(),
};

exports = path;