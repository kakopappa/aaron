/*var gpio = require("gpio");

var gpio4 = gpio.export(4, {
   direction: "in",
   ready: function() {
     console.log('ready');
   }
});

gpio4.on("change", function(val) {
  // console.log(val)
  if (val == 0) {
       console.log('Motion detected!');
  }
  else{
       console.log('Got nothing!');   
  }
});
*/


var gpio = require('rpi-gpio')

var pir = {
  pin: 7,
  loopTime: 1500, //check the sensor this often
  tripped: false,
  value: undefined
}

var readInterval = function() {
  gpio.read(pir.pin, function(error, value) {
    // we only want to move on if something changed
    if (value === pir.tripped) return

    pir.tripped = value
    if (pir.tripped) console.log('tripped!')
    else console.log("it's quiet... a little TOO quiet...")
  })
}

var onSetup = function(error) {
  if (error) console.error(error)
  return setInterval(readInterval, pir.loopTime)
}

gpio.setMode(gpio.MODE_RPI)
gpio.setup(pir.pin, gpio.DIR_IN, onSetup)

