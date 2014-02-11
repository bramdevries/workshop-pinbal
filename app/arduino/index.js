var firmata = require('firmata'),
    config  = require('../config');


var pins = {
  servo: 9,
  triggers: [13, 12, 11, 10]
};

function Arduino () {
  this.board = undefined;
}

Arduino.prototype.connect = function(next) {
  var self = this;
  var board = new firmata.Board(config.path, function(err){
    if (err) {console.log(err); return;}

    board.pinMode(pins.servo, board.MODES.SERVO);

    for (var i = 0; i  < pins.triggers.length; i++) {
      board.pinMode(pins.triggers[i], board.MODES.OUTPUT);
    }

    self.board = board;
    next();
  });
};

Arduino.prototype.setAngle = function(angle) {
  this.board.servoWrite(pins.servo, angle);
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

module.exports = Arduino;