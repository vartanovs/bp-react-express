/**
 * @module server/app.ts
 * @description Server Declaration
 */

import * as path from 'path';

// Import Express Module
import * as express from 'express';
import { Request, Response } from 'express';

import postgresClient from './postgresClient'; 

// Invoke Express Server
const app = express();

// Respond to GET Requests to root '/' by serving React Bundle
app.use(express.static(path.resolve(__dirname, '../../build')));

// GET /postgres - test route for postgres client
app.get('/postgres', async(_: Request, res: Response) => {
  const response = await postgresClient.query('SELECT NOW();');
  const now = response.rows[0];
  res.send(now);
})

// Respond to all other requests with 404 status and 'route not found' message
app.use('*',
  (_: Request, res: Response): Response => res.status(404).send('Route Not Found!'));

export default app;
