var five    = require('johnny-five'),
    _       = require('underscore'),
    events = require('events');

module.exports = Target;

function Target(options) {
  events.EventEmitter.call(this);
  _.bindAll(this, 'gotHit');

  this.isHit = false;
  this.board = options.board;

  // A target always has an input pin and output pin (Led).
  this.output = new five.Led({
    pin: options.output
  });

  this.input = new five.Pin({
    pin: options.input
  });

  this.input.read(this.gotHit);
}

Target.super_ = events.EventEmitter;
Target.prototype = Object.create(events.EventEmitter.prototype, {
  constructor: {
    value: Target,
    enumerable: false
  }
});

Target.prototype.gotHit = function(val){
  this.emit('target.hit', this, val);
};

Target.prototype.reset = function() {
  this.output.off();
  this.isHit = false;
};