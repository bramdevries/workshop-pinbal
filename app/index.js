function start (app) {
  var pinball = require('./server');
  pinball(app);
}

module.exports = start;