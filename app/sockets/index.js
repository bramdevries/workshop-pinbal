var Player = require('../player'),
    Game   = require('../game'),
    _      = require('underscore');

var clients = 0,
    socket,
    game,
    player,
    cleanArduino;

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

    socket.on('disconnect', function(){
      game.reset();
    });

    socket.on('arduino.launcher_set', function(data){
      player.arduino.setAngle(data.percentage, function(){

        game = new Game(player, function(){
          player.arduino.on('game.end', function(){
            var score = game.end();
            console.log(score);
          });
        });


        socket.emit('arduino.angle_set');
      });
    });
  });
};