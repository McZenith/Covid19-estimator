import xml from 'xml2js';

import fs from 'fs';

import path from 'path';
import covid19ImpactEstimator from './estimator';

const xmlBuilder = new xml.Builder();

const controller = (req, res) => {
  let data;
  if (req.body !== undefined || null) {
    data = covid19ImpactEstimator(req.body);
    if (req.params.type === 'xml') {
      res.type('application/xml');
      return res.status(201).send(xmlBuilder.buildObject(data));
    }
    return res.status(201).json(data);
  }
  if (req.params.type === 'xml') {
    res.type('application/xml');
    return res.status(500).send(xmlBuilder.buildObject('invalid input'));
  }
  return res.status(500).json('invalid input');
};

// logger
const logger = (req, res) => {
  const readStream = fs.createReadStream(path.join(__dirname, 'logs.txt'));
  readStream.on('error', (error) => res.status(500).json(error));
  readStream.on('open', () => {
    res.status(200).setHeader('content-type', 'text/plain');
    return readStream.pipe(res);
  });
};

function wildGet(req, res) {
  return res.status(200).json('your GET request did not match any path');
}

export { controller, logger, wildGet };
