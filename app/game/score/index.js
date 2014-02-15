var moment = require('moment');

module.exports = Score;

function Score() {
  this.start = moment();
  this.pinScore = 2500;
  this.score = 0;
}

Score.prototype.stop = function(pins) {
  var finish = moment();
  var duration = finish.diff(this.start, 'seconds');

  // Get a point for each pin hit.
  var base = this.pinScore * pins;

  // Take into account the duration of the game.

  this.score = base + (base / duration);
  this.score = Math.round(this.score);

//  this.score = this.base - (this.base * (this.decay * difference)) + (this.pinScore * pins);

  this.score = (this.score < 0) ? 0 : this.score;

  return this.score;
};