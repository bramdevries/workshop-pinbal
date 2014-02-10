var firmata = require('firmata'),
    config  = require('../config');

var arduino = {
  connect: function(next) {
    var board = new firmata.Board(config.path, function(err){
      if (err) {console.log(err); return;}
      next(board);
    });
  }
};

module.exports = arduino;