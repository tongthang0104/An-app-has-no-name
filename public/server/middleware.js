'use strict';

const bodyParser  = require('body-parser');

module.exports = function(app, express) {

  const questionRouter = express.Router();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  // app.use(express.static(`${__dirname}/../..`));

  app.use('/api/questions', questionRouter);
  require('./questionRoutes')(questionRouter);
};
