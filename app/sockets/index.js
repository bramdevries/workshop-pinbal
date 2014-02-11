var Client = require('../clients');

module.exports = function(io) {
  io.sockets.on('connection', function(socket){
    // When connecting to the server, look for an Arduino. If it's found, connect. If not, return an error.
    var client = new Client(socket);

    socket.on('arduino.change', function(data){
      client.arduino.setAngle(data.angle);
    });

    socket.on('arduino.controls', function(data){
      client.arduino.trigger(data.trigger);
    });
  });
};