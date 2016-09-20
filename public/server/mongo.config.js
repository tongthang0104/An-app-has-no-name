'use strict';

const MongoClient = require('mongodb');
const assert = require('assert');
const objectID = MongoClient.ObjectID;
const mongodb = process.env.MONGODB_URI || 'mongodb://heroku_0pj97rr5:bh20lqfm3leg0c5jdutehacf7a@ds033056.mlab.com:33056/heroku_0pj97rr5';
const utils = require('./utils');



// let categories = ['Entertainment: Music', 'General Knowledge'];

const findDocuments = (db, callback) => {

  const collection = db.collection('questions');
  const randomC = collection.count()
  const rand = Math.floor( Math.random() * randomC );
  let categoriesList = utils.getRandomCategories();

  console.log("this is list of cat", categoriesList)
  collection.find({category: { $in: categoriesList}}).toArray((err, questions) => {
    assert.equal(err, null);
    callback(questions, categoriesList);
  });
};

const jeopardy = MongoClient.connection;

module.exports = jeopardy;

module.exports = {
  findQuestion: (callback) => {
    MongoClient.connect(mongodb, (err, db) => {
      assert.equal(null, err);
      findDocuments(db, (data, categoriesList) => {
        callback(data, categoriesList);
        db.close();
      });
    });
  }
};
