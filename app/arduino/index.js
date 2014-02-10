var firmata = require('firmata');

var arduino = {
  path : '/dev/tty.usbmodemfd121',
  connect: function(next) {
    var board = new firmata.Board(this.path, function(err){
      if (err) {console.log(err); return;}
      next(board);
    });
  }
};

module.exports = arduino;