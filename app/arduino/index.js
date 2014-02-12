var firmata = require('firmata'),
    events  = require('events'),
    Target  = require('./target'),
    _       = require('underscore');

var pins = {
  servo: 13,
  triggers: [2, 3],
  targets: [{hit: 8, led: 9}, {hit: 10, led: 11}]
};

var targets = [];

module.exports = Arduino;

function Arduino (path) {
  _.bindAll(this, 'hitTarget');
  events.EventEmitter.call(this);


  this.path = path;
}

Arduino.super_ = events.EventEmitter;
Arduino.prototype = Object.create(events.EventEmitter.prototype, {
  constructor: {
    value: Arduino,
    enumerable: false
  }
});

Arduino.prototype.connect = function(next) {
  var self = this;
  var board = new firmata.Board(this.path, function(err){
    if (err) {console.log(err); return;}

    board.pinMode(pins.servo, board.MODES.SERVO);

    for (var i = 0; i  < pins.triggers.length; i++) {
      board.pinMode(pins.triggers[i], board.MODES.OUTPUT);
    }

    self.board = board;
    next();
  });
};

Arduino.prototype.setAngle = function(perc, next) {
  // Calculate angle

  var angle = Math.round(180 * (perc / 100));
  //this.board.servoWrite(pins.servo, angle);
  next();
};

Arduino.prototype.trigger = function(trigger) {
  var pin = pins.triggers[trigger - 1];

  if (pin !== undefined) {
    var board = this.board;
    board.digitalWrite(pin, board.HIGH);
    setTimeout(function(){
      board.digitalWrite(pin, board.LOW);
    }, 200);
  }
};

/**
 * Setup the targets, create a new instance of Target for each pin.
 */
Arduino.prototype.setup= function() {
  for (var i = 0; i  < pins.targets.length; i++) {
    var t = new Target(this.board, pins.targets[i]);
    t.on('target.hit', this.hitTarget);
    targets.push(t);
  }

  this.targetsHit = 0;
};

Arduino.prototype.reset = function() {
  targets = [];
  this.targetsHit = 0;
};

Arduino.prototype.hitTarget = function(target) {
  this.targetsHit++;

  if (this.targetsHit === targets.length) {
    this.emit('game.end');
  }
};