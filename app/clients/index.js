var Arduino = require('../arduino');

function Client(socket) {
  this.arduino = new Arduino();
  this.socket = socket;

  var self = this;
  this.arduino.connect(function(){
    self.socket.emit('arduino.connected');
  });
}

module.exports = Client;