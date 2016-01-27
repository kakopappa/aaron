// https://github.com/pubnub/workshop-raspberrypi/tree/master/projects-nodejs/motion-sensor

/*
 * Using a PIR motion sensor with Pi
 *
 */


var five = require('johnny-five');
var board = new five.Board();
var Pir = function() {};


Pir.prototype.detect = function (callBack) {

board.on("ready", function() {

  // Create a new `motion` hardware instance.
  var motion = new five.IR.Motion(P1-7);

  // "calibrated" occurs once, at the beginning of a session,
  motion.on("calibrated", function() {
    console.log("calibrated");
    callback();
  });

  // "motionstart" events are fired when the "calibrated"
  // proximal area is disrupted, generally by some form of movement
  motion.on("motionstart", function() {
    console.log("motionstart");
    callback();
  });

  // "motionend" events are fired following a "motionstart" event
  // when no movement has occurred in X ms
  motion.on("motionend", function() {
    console.log("motionend");
    callback();
  });
});
	 
}

exports.Pir = new Pir();
