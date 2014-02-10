// Dependencies
//

var express = require('express'),
    hbs     = require('express-hbs'),
    path    = require('path'),
    http    = require('http'),
    routes  = require('../routes');


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

  server.use(express.static(path.join(__dirname, '../../', 'public')));

  routes(server);

  if (server.get('env') === 'development') {
    server.use(express.errorHandler());
  }

  http.createServer(server).listen(server.get('port'), function(){
    console.log("Pinball is running on port " + server.get('port'));
  });
}

function init(app) {
  if (!app) {
    app = express();
  }

  setup(app);
}

module.exports = init;