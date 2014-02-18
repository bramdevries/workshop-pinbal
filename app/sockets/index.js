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

  function gameEnd(socket, pins) {
    console.log('Game has ended');
    //arduino.reset();
    socket.emit('arduino.score', {score: game.calculateScore(pins)});
  }

  function startPlaying(socket) {
    player = new Player(arduino);
    socket.emit('arduino.playtime', {access_token: player.access_token});
    socket.on('disconnect', function(){
      if (game) {
        game.reset();
      }
    });
  }

  io.sockets.on('connection', function(socket){

    if (arduino === undefined) {
      arduino = new Arduino();
      arduino.connect(function(){
        startPlaying(socket);
      });
    }
    else {
      startPlaying(socket);
    }

    arduino.once('game.end', function(pins){
      gameEnd(socket, pins);
    });

    socket.on('arduino.trigger', function(data){
      if (data.access_token === player.access_token && player.arduino.listening) {
        player.arduino.trigger(data.trigger);
      }
    });

    socket.on('arduino.launcher_set', function(data){
      console.log(data);
      if (data.access_token === player.access_token) {
        player.arduino.setAngle(data.percentage, function(){
          game = new Game(player);
          arduino.listening = true;
          socket.emit('arduino.angle_set');
        });
      }
    });
  });
};