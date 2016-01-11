var sensorLib = require("node-dht-sensor");

exports.getTemperatureAndHumidity = function(cb) {
  var type = 22;
  var pin = 17;

  if(sensorLib.initialize(type, pin)) {
    var readout = sensorLib.read();

    cb('Current temperature is ' + readout.temperature.toFixed(2) + ' celsius and indoor humidity  ' +
             readout.humidity.toFixed(2) + '% ' );

    console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
              'humidity: ' + readout.humidity.toFixed(2) + '%');
  }
  else {
      cb("dht sensor failed");
  }
};
