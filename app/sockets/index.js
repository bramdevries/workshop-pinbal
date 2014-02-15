var Player  = require('../player'),
    Game    = require('../game'),
    Arduino = require('../arduino'),
    _       = require('underscore');

var clients = [],
    game,
    player,
    arduino,
    io;

module.exports = function(io) {


  io = io;


  function startPlaying(socket) {
    player = new Player(arduino);
    socket.emit('arduino.playtime', {access_token: player.access_token});
  }

  function checkPositionInQueue(socket) {
    if (socket !== undefined) {
      if (clients.indexOf(socket) === 0) {
        if (arduino === undefined) {
          arduino = new Arduino('/dev/tty.usbmodemfd121');
          arduino.connect(function(){
            startPlaying(socket);
          });
        }
        else {
          startPlaying(socket);
        }
      }
      else {
        socket.emit('arduino.spectator', {position: clients.indexOf(socket)});
      }
    }
  }


  io.sockets.on('connection', function(socket){

    clients.push(socket);

    checkPositionInQueue(socket);

    socket.on('disconnect', function(socket){
      clients.splice(clients.indexOf(socket));
      _.each(clients, function(s){
        checkPositionInQueue(s);
      });
    });

    socket.on('queue.check', function(){
      checkPositionInQueue(socket);
    });

    socket.on('arduino.trigger', function(data){
      if (data.access_token === player.access_token) {
        player.arduino.trigger(data.trigger);
      }
    });

    socket.on('arduino.launcher_set', function(data){
      player.arduino.once('launcher.set', function(){
        setTimeout(function(){
          player.arduino.setAngle(0);
          player.arduino.listening = true;

          game = new Game(player, function(){
            player.arduino.on('game.end', function(pins){
              var score = game.end(pins);
              player.arduino.listening = false;
              console.log(score);
              socket.emit('arduino.score', {score: score});
            });
          });


          socket.on('disconnect', function(){
            game.reset();
          });

          socket.emit('arduino.angle_set');

        }, 500);
      });

      player.arduino.setAngle(data.percentage, function(){
        player.arduino.emit('launcher.set');
      });
    });
  });
};