#!/usr/bin/env python


# install node-dht-sensor did not work :(


import math
import Adafruit_DHT


pin = 17 ## Assuming the DHT11 sensor is connected to GPIO pin number 17


### Assume 
humidity, temperature = Adafruit_DHT.read_retry( Adafruit_DHT.DHT11, pin )
if humidity is not None and temperature is not None:
	print "right now it is " + format(temperature, '.1f') + " celcius and " +  format(humidity, '.0f') + " % humidity"
else:
        print "Failed to get reading. Try again!"




