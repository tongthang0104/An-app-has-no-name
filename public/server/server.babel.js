'use strict';
import express from 'express';
import mongodb from './mongo.config';

const app = express();

app.use('/', express.static(`${__dirname}/../..`));
app.listen(process.env.PORT || 9999);

console.log('Server is running on Port 9999');
