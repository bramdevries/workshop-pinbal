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

Game.prototype.end = function() {
  var score = this.score.stop();
  return score;
};

Game.prototype.reset = function() {
  this.player.arduino.reset();
};