var moment = require('moment');

module.exports = Score;

function Score() {
  this.start = moment();
  this.base = 5000;
  this.decay = 0.005;
  this.score = 0;
}

Score.prototype.stop = function() {
  var finish = moment();
  var difference = finish.diff(this.start, 'seconds');

  this.score = this.base - (this.base * (this.decay * difference));

  this.score = (this.score < 0) ? 0 : this.score;

  return this.score;
};