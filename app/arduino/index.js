var five    = require("johnny-five"),
    _       = require('underscore'),
    events  = require('events'),
    Target  = require('./target');

var pins = {
  servo: 4,
  triggers: [2, 3],
  targets: [{input: 8, output: 9}],
  ir: 5
};

var targets = [],
    motion;

module.exports = Arduino;

function Arduino() {
  events.EventEmitter.call(this);

  _.bindAll(this, 'hitTarget');
  this.listening = false;
}


Arduino.super_ = events.EventEmitter;
Arduino.prototype = Object.create(events.EventEmitter.prototype, {
  constructor: {
    value: Arduino,
    enumerable: false
  }
});

Arduino.prototype.connect = function(next) {
  this.board = new five.Board();

  var self = this;
  this.board.on("ready", function() {

    for (var i = 0; i  < pins.triggers.length; i++) {
      this.pinMode(pins.triggers[i], 1);
    }

    // Setup Servo
    self.servo = new five.Servo(pins.servo);
    self.servo.min();

    // Setup Motion Detectors

    self.motion = new five.IR.Motion(pins.ir);

    this.repl.inject({
      motion: self.motion
    });

    self.motion.on("motionstart", function(err, ts) {
      if (self.listening) {
       self.emit('game.end', self.targetsHit);
      }
    });

    // Setup Targets
    self.setup();

    next();
  });
};

Arduino.prototype.setAngle = function(perc, next) {
  var angle = Math.round(180 * (perc / 100));

  // `Charge` it.
  this.servo.to(angle);

  self = this;
  // `Launch` it
  setTimeout(function(){
    self.servo.to(0);

    if (next) {
      next();
    }

  }, 800);
};

Arduino.prototype.trigger = function(trigger) {
  var pin = pins.triggers[trigger - 1];

  if (pin !== undefined) {

    var led = new five.Led({
      pin: pin
    });

    led.on();

    this.board.wait(100, function(){
      led.off();
    });
  }
};

Arduino.prototype.setup = function() {
  targets = [];
  for (var i = 0; i < pins.targets.length; i++) {
    var t = new Target({
      input: pins.targets[i].input,
      output: pins.targets[i].output,
      board: this.board
    });

    t.on('target.hit', this.hitTarget);

    targets.push(t);
  }

  this.targetsHit = 0;
};

// Reed contact
Arduino.prototype.hitTarget = function(target, v) {
  if (!target.isHit && v === 1 && this.listening) {

    target.output.on();
    target.isHit = true;
    this.targetsHit++;

    if (this.targetsHit === targets.length) {
      this.emit('game.end', this.targetsHit);
    }
  }
};

Arduino.prototype.reset = function() {
  _.each(targets, function(target){
    target.reset();
  });

  this.targetsHit = 0;
  this.listening = false;
};