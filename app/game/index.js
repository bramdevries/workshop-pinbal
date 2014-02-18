var Score  = require('./score'),
    _      = require('underscore');

module.exports = Game;

function Game(player) {

  this.player = player;
  this.score = new Score();
}

/**
 * Calculate the score and return it. Take into account how many pins have been 'hit'.
 * @return int Score
 */
Game.prototype.calculateScore = function(pins) {
  var score = this.score.stop(pins);
  return score;
};

Game.prototype.reset = function() {
  this.player.arduino.reset();
};