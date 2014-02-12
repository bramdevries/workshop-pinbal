var firmata = require('firmata'),
    Target  = require('./target');

var pins = {
  servo: 13,
  triggers: [2, 3],
  targets: [{hit: 8, led: 9}]
};

var targets = [];

function Arduino (path) {
  this.path = path;
}

Arduino.prototype.connect = function(next) {
  var self = this;
  var board = new firmata.Board(this.path, function(err){
    if (err) {console.log(err); return;}

    board.pinMode(pins.servo, board.MODES.SERVO);

    for (var i = 0; i  < pins.triggers.length; i++) {
      board.pinMode(pins.triggers[i], board.MODES.OUTPUT);
    }

    self.board = board;

    self.setupTargets();

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
Arduino.prototype.setupTargets = function() {
  for (var i = 0; i  < pins.targets.length; i++) {
    targets.push(new Target(this.board, pins.targets[i]));
  }
};

module.exports = Arduino;