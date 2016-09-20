'use strict';
// const db = require('./mongo.config');

module.exports = function(appRoute) {






  appRoute.route('/').get(function(req, res) {
    console.log('making api call');
    res.send('First call API');
  });
};
