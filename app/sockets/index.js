var arduino = require('../arduino');

var board;

var pins = {
  servo: 9,
  trigger1: 13
};

module.exports = function(io) {
  io.sockets.on('connection', function(socket){
    // When connecting to the server, look for an Arduino. If it's found, connect. If not, return an error.
    arduino.connect(function(b){
      // Emit a notification that we connected to the Arduino.
      socket.emit('arduino.connected');

      b.pinMode(pins.servo, b.MODES.SERVO);
      b.pinMode(pins.trigger1, b.MODES.OUTPUT);

      board = b;
    });

    socket.on('arduino.change', function(data){
      board.servoWrite(pins.servo, data.angle);
    });

    socket.on('arduino.controls', function(){
      board.digitalWrite(pins.trigger1, board.HIGH);
      // Reset it after x amount of miliseconds
      setTimeout(function(){
        board.digitalWrite(pins.trigger1, board.LOW);
      }, 200);
    });
  });
};