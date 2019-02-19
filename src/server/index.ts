/**
 * @module server/index.ts
 * @description Server Entry Point
 */

// Import active server
import app from './app';

// Import database clients - as needed
import dynamoClient from './dynamoClient';
// import mongoClient from './mongoClient';
// import postgresClient from './postgresClient';
// import redisClient from './redisClient';

// Specify PORT (if not specified in ENV)
const PORT = process.env.PORT || '3000';

// Activate server to listen for requests
app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));

dynamoClient.listTables((err, data) => {
  if (err) console.log(err);
  else console.log(data);
});
