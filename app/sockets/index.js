module.exports = function(io, players) {
  io.sockets.on('connection', function(socket){
    // When connecting to the server, look for both Arduino's. If found, let the user select which one he is.
    socket.emit('arduino.players', {players: players.length});

/*
    socket.on('arduino.change', function(data){
      client.arduino.setAngle(data.angle);
    });

    socket.on('arduino.controls', function(data){
      client.arduino.trigger(data.trigger);
    });*/
  });
};