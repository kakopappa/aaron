//var pir = require('./lib/sensors/motion/pir.js').Pir
var dht = require('./lib/sensors/temperature/dht.js').Dht

dht.read(function(str) {
  console.log('Got: ' + str);
});

//pir.detect(function() {
//	console.log('Got callback ..')
//});
