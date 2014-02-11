var arduino = require('../arduino');

var board;

var pins = {
  servo: 9,
  triggers: [13, 12, 11, 10]
};

module.exports = function(io) {
  io.sockets.on('connection', function(socket){
    // When connecting to the server, look for an Arduino. If it's found, connect. If not, return an error.
    arduino.connect(function(b){
      // Emit a notification that we connected to the Arduino.
      socket.emit('arduino.connected');

      b.pinMode(pins.servo, b.MODES.SERVO);

      for (var i = 0; i  < pins.triggers.length; i++) {
        b.pinMode(pins.triggers[i], b.MODES.OUTPUT);
      }

      board = b;
    });

    socket.on('arduino.change', function(data){
      board.servoWrite(pins.servo, data.angle);
    });

    socket.on('arduino.controls', function(data){

      var trigger = pins.triggers[data.trigger - 1];

      if (trigger !== undefined) {
        board.digitalWrite(trigger, board.HIGH);
        setTimeout(function(){
          board.digitalWrite(trigger, board.LOW);
        }, 300);
      }
    });
  });
};