var _      = require('underscore'),
    events = require('events');

module.exports = Target;

function Target(board, pins) {
  _.bindAll(this, 'gotHit');

  events.EventEmitter.call(this);

  this.board = board;
  this.led = pins.led;
  this.hit = pins.hit;

  this.isHit = false;

  this.board.pinMode(this.hit, this.board.MODES.INPUT);
  this.board.pinMode(this.led, this.board.MODES.OUTPUT);

  this.board.digitalRead(this.hit, this.gotHit);
}

Target.super_ = events.EventEmitter;
Target.prototype = Object.create(events.EventEmitter.prototype, {
  constructor: {
    value: Target,
    enumerable: false
  }
});

Target.prototype.gotHit = function(d) {
  if (!this.isHit && d === 1) {
    this.isHit = true;
    this.board.digitalWrite(this.led, this.board.HIGH);
    this.emit('target.hit', this);
  }
};

Target.prototype.reset = function() {
  this.isHit = false;
  this.board.digitalWrite(this.led, this.board.LOW);
};