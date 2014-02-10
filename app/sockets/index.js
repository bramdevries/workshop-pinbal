var arduino = require('../arduino');

var board;

module.exports = function(io) {
  io.sockets.on('connection', function(socket){
    // When connecting to the server, look for an Arduino. If it's found, connect. If not, return an error.
    arduino.connect(function(b){
      // Emit a notification that we connected to the Arduino.
      socket.emit('arduino.connected');

      b.pinMode(9, b.MODES.SERVO);

      board = b;
    });

    socket.on('arduino.change', function(data){
      board.servoWrite(9, data.angle);
    });
  });
};