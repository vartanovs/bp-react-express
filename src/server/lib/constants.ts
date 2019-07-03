/**
 * @module server/constants.ts
 * @description Constant Values
 */

export enum MONGO_MESSAGES {
  CONNECT = 'Connected to Mongo DB',
  ERROR = 'Mongo DB Error: ',
}

export enum REDIS_MESSAGES {
  CONNECT = 'Connected to Redis Server',
  READY = 'Redis Server ready to receive commands',
  RECONNECT = 'Reconnected To Redis Server',

  CLOSE = 'Connection to Redis Server has closed',
  ERROR = 'Redis Error: ',
}