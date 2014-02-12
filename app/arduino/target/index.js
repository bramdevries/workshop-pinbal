var _ = require('underscore');

function Target(board, pins) {
  _.bindAll(this, 'gotHit');

  this.board = board;
  this.led = pins.led;
  this.hit = pins.hit;

  this.isHit = false;

  this.board.pinMode(this.hit, this.board.MODES.INPUT);
  this.board.pinMode(this.led, this.board.MODES.OUTPUT);

  this.board.digitalRead(this.hit, this.gotHit);
}

Target.prototype.gotHit = function(d) {
  if (!this.isHit && d === 1) {
    this.isHit = true;
    this.board.digitalWrite(this.led, this.board.HIGH);
  }
};

module.exports = Target;