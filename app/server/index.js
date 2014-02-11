var express = require('express'),
    hbs     = require('express-hbs'),
    path    = require('path'),
    http    = require('http'),
    io      = require('socket.io'),
    sockets = require('../sockets'),
    Player  = require('../player'),
    front   = require('../controllers/front');

var players = [];

function setup(server) {

  server.set('port', process.env.PORT || 3000);

  server.engine('hbs', hbs.express3({
    partialsDir: __dirname + '/..' + '/views/partials'
  }));

  server.set('view engine', 'hbs');
  server.set('views', __dirname + '/..' + '/views');

  server.use(express.favicon());
  server.use(express.logger('dev'));
  server.use(express.json());
  server.use(express.bodyParser());

  server.use(express.static(path.join(__dirname, '../../', 'public')));

  if (server.get('env') === 'development') {
    server.use(express.errorHandler());
  }

  var s = http.createServer(server);

  s.listen(server.get('port'), function(){
    console.log("Pinball is running on port " + server.get('port'));
  });

  io = io.listen(s);

  sockets(io, players);
  setupArduinos();
  server.get('/', front.index);
}

/**
 * Connect to the Arduino's, each Arduino becomes a player.
 * On succes, show the amount of Arduino's that are connected to the players.
 */
function setupArduinos() {
  players.push(new Player(io, '/dev/tty.usbmodemfd121'));
}

function init(app) {
  if (!app) {
    app = express();
  }

  setup(app);
}

module.exports = init;