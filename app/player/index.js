var Arduino = require('../arduino');

function Player(socket, path) {
  this.socket = socket;
  var self = this;
  this.board = new Arduino(path).connect(function(b){
    self.socket.emit('arduino.connected');
    return b;
  });
}

module.exports = Player;