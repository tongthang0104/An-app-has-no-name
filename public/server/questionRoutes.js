'use strict';
const mongoConfig = require('./mongo.config');
const utils = require('./utils');

module.exports = function(appRoute) {

  appRoute.route('/:cat1/:cat2/:cat3/:cat4/:cat5/').get(function(req, res) {
    console.log('making api call', req.params);

    const categoriesList = [];
    for (let key in req.params) {
      categoriesList.push(req.params[key]);
    }

    console.log(categoriesList);
    let questionList = {};

    mongoConfig.findQuestion(categoriesList, (data) => {
      console.log('categoriesList', categoriesList)

      for (let category of categoriesList) {
        if (questionList[category] === undefined) {
          questionList[category] = [];
        }
          questionList[category] = questionList[category].concat(utils.getRandomQuestions(category, data));

          console.log(questionList[category]);
      }

      res.send(questionList);
    });
  });
};
