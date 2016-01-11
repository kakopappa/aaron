var five = require("johnny-five");
var Rasp = require("raspi-io");

var board = new five.Board({
    io: new Rasp()
});

board.on("ready", function() {
  console.log('board is ready');
});

module.exports = function detect() {
  this.pinMode(16, fivePin.INPUT);

  this.digitalRead(16, function(value){
      console.log(value);
  });
}
