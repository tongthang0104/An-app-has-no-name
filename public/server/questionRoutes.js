'use strict';

module.exports = function(appRoute) {
  appRoute.route('/').get(function(req, res) {
    console.log('making api call');
    res.send('First call API');
  });
};
