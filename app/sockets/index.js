var arduino = require('../arduino');

module.exports = function(io) {
  io.sockets.on('connection', function(socket){
    // When connecting to the server, look for an Arduino. If it's found, connect. If not, return an error.
    var board = arduino.connect(function(b){
      // Emit a notification that we connected to the Arduino.
      socket.emit('arduino.connected');
      return b;
    });
  });
};