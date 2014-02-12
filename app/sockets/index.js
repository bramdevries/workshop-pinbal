var Player = require('../player');
var clients = 0,
    socket,
    player;

module.exports = function(io, arduino) {
  io.sockets.on('connection', function(socket){
    socket = socket;

    if (clients >= 1) {
      socket.emit('arduino.spectator');
    }
    else {
      // Create a new player.
      player = new Player(arduino);
      socket.emit('arduino.playtime', {access_token: player.access_token});
    }

    socket.on('arduino.trigger', function(data){
      if (data.access_token === player.access_token) {
        player.arduino.trigger(data.trigger);
      }
    });

    socket.on('arduino.launcher_set', function(data){
      player.arduino.setAngle(data.percentage, function(){
        socket.emit('arduino.angle_set');
      });
    });

/*
    console.log('New client connected');
   /* /*if (clients.length >= 2) {
      console.log('Too many clients connected');
    }*/

   /* // When connecting to the server, look for both Arduino's. Return the connected amount.
    socket.emit('arduino.devices', {devices: devices});

    // A player selects an arduino, remove it from the available devices. Send back an updated list of devices.
    socket.on('arduino.selected', function(data){
      clients.push(new Client(devices.splice(data.device_id - 1)));
      socket.emit('arduino.update_devices', {devices: devices});
    });

    socket.on('disconnect', function(){
      console.log('Game ended');
    });

    // When disconnecting, end the game.
/*
    socket.on('arduino.change', function(data){
      client.arduino.setAngle(data.angle);
    });

    socket.on('arduino.controls', function(data){
      client.arduino.trigger(data.trigger);
    });*/
  });
};