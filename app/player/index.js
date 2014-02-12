var hat = require('hat');

function Player(arduino) {
  this.arduino = arduino;
  this.access_token = hat();
}

module.exports = Player;