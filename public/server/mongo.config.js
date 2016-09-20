'use strict';
const MongoClient = require('mongodb');
const assert = require('assert');

const mongodb = process.env.MONGODB_URI || 'mongodb://localhost/jeopardy';

const findDocuments = (db, callback) => {
  const collection = db.collection('questions');
  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    console.log('This is database',docs);
    callback(docs);
  });
};

MongoClient.connect(mongodb, (err, db) => {
  assert.equal(null, err);
  findDocuments(db, () => {
    db.close();
  });
});

const jeopardy = MongoClient.connection;

module.exports = jeopardy;
