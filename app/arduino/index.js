var five    = require("johnny-five"),
    _       = require('underscore'),
    events  = require('events'),
    Target  = require('./target');

var pins = {
  servo: 12,
  triggers: [2, 3],
  targets: [{input: 8, output: 9}, {input: 10, output: 11}],
  ir: {receiver: 'A0', transmit: 4}
};

var targets = [];

module.exports = Arduino;

function Arduino(path) {
  events.EventEmitter.call(this);

  _.bindAll(this, 'hitTarget');
  this.path = path;
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
  this.board = new five.Board({
    port: this.path
  });

  var self = this;
  this.board.on("ready", function() {

    for (var i = 0; i  < pins.triggers.length; i++) {
      this.pinMode(pins.triggers[i], 1);
    }

    var irLed = new five.Led(pins.ir.transmit);
    irLed.on();

    self.servo = new five.Servo(pins.servo);
    self.servo.min();

    //

    /*var irLed
    // IR Receiver
    analog = new five.Pin(pins.drop.receiver);

    analog.read(function(v) {
       console.log(v);
    });*/

    next();
  });
};

Arduino.prototype.setAngle = function(perc, next) {
  // Calculate angle
  var angle = Math.round(180 * (perc / 100));
  this.servo.to(angle);

  if (next) {
    next();
  }
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

Arduino.prototype.hitTarget = function(target, v) {
  if (!target.isHit && v === 1 && this.listening) {

    target.output.on();
    target.isHit = true;
    this.targetsHit++;

    if (this.targetsHit === targets.length) {
      this.emit('game.end');
    }
  }

  //console.log(target.input.pin + ' is ' + v);
};

Arduino.prototype.reset = function() {
  _.each(targets, function(target){
    target.reset();
  });

  this.targetsHit = 0;
};