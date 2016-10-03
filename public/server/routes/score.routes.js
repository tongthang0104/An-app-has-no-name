const { saveScore } = require('../controller/score.controller');

module.exports = (app) => {
  app.post('/save', saveScore);
}