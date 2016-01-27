var util = require('../../util.js').Util;
var path = require('path');
var Dht = function() {};


Dht.prototype.read = function (callback) {
  var scriptPath = path.resolve(__dirname, 'dth11.py')
  var command = 'sudo python ' + scriptPath;

  console.log('Script Path:' + scriptPath);

  util.exec(command, function (response) {
     console.log('Python script output: ' + response);
     callback(response);
  }); 
}

exports.Dht = new Dht();

/*
var sensorLib = require("node-dht-sensor");
var Dht = function() {};

Dht.prototype.read = function (callback) {
  var type = 11;
  var pin = 17;

  if(sensorLib.initialize(type, pin)) {
    var readout = sensorLib.read();

    callback('Current temperature is ' + readout.temperature.toFixed(2) + ' celsius and indoor humidity  ' +
             readout.humidity.toFixed(2) + '% ' );

    console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
              'humidity: ' + readout.humidity.toFixed(2) + '%');
  }
  else {
      callback("dht sensor failed");
  }
}


exports.Dht = new Dht();
*/
