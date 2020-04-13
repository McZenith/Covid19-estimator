import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { controller, wildGet, logger } from './init';

const app = express();

const writeStream = require('fs').createWriteStream('logs.txt', { flags: 'a' });

// setting CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Access, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  next();
});

// parse json encoded body requests
app.use(bodyParser.json());

// parse url encoded body requests
app.use(bodyParser.urlencoded({ extended: true }));

// set up logger
app.use(
  morgan(':method    :url    :status    0:total-time[0]ms', {
    stream: writeStream
  })
);

// routes
app.post('/api/v1/on-covid-19/:type', controller);
// logs
app.get('/api/v1/on-covid-19/logs', logger);
// wild post requests
app.post('/api/v1/on-covid-19', controller);
// wild get requests
app.get('/api/v1/on-covid-19', wildGet);
app.get('/api/v1/on-covid-19/*', wildGet);

export default app;
