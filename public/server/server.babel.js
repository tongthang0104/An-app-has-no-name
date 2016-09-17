"use strict";
import express from 'express';

const app = express();
const MongoClient = require('mongodb').MongoClient
 , assert = require('assert');

app.use('/', express.static(`${__dirname}/../..`));

const mongodb = 'mongodb://localhost/jeopardy';
const findDocuments = (db, callback) => {
  const collection = db.collection('medium');
  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    console.log(docs);
    callback(docs);
  });
};
MongoClient.connect(mongodb, (err, db) => {
  assert.equal(null, err);
  findDocuments(db, () => {
    db.close();
  });
});

app.listen(process.env.PORT || 9999);

console.log('Server is running on Port 9999');
