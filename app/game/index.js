var Score  = require('./score'),
    _      = require('underscore');


var doSetup = true;

module.exports = Game;

function Game(player, next) {

  this.player = player;
  this.score = new Score();

  if (doSetup) {
    doSetup = false;
    this.player.arduino.setup();
    next();
  }
}

/**
 * Calculate the score and return it. Take into account how many pins have been 'hit'.
 * @return int Score
 */
Game.prototype.end = function(pins) {
  console.log(pins);
  var score = this.score.stop(pins);
  return score;
};

Game.prototype.reset = function() {
  this.player.arduino.reset();
};