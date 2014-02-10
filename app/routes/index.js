var front = require('../controllers/front');

module.exports = function(server) {
  server.get('/', front.index);
};