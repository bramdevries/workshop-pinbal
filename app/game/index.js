var Score  = require('./score'),
    _      = require('underscore');

module.exports = Game;

function Game(player) {

  this.player = player;
  this.score = new Score();
}

Game.prototype.end = function() {
  var score = this.score.stop();

  // Reset the LED's on the Arduino.
  //this.player.arduino.reset();

  return score;
};