/**
 * @module server/app.ts
 * @description Server Declaration
 */

// Import Express Module
import express, { Request, Response } from 'express';

// Invoke Express Server
const app = express();

// Respond to GET Requests to root '/' route with 200 status and greeting
app.get('/',
  (_: Request, res: Response): Response => res.status(200).send('Hello World from Express and TS Node!'));

// Respond to all other requests with 404 status and 'route not found' message
app.use('*',
  (_: Request, res: Response): Response => res.status(404).send('Route Not Found!'));

export default app;
