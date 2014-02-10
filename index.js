var pinball = require('./app');
pinball();

/*
var firmata = require('firmata');
var path = '/dev/tty.usbmodemfd121';

var board = new firmata.Board(path, function(err){
  if (err) { console.log(err); return;}
  console.log('connected');
  setup();
});

function setup() {
  board.pinMode(9, board.MODES.SERVO);
  var degrees = 10;
  var incrementer = 10;
  setInterval(function(){
    console.log('move');
   if(degrees >= 180 || degrees === 0){
   incrementer *= -1;
   }
   degrees += incrementer;
   board.servoWrite(9, degrees);
  }, 500);
}*/