var alexa = require('alexa-app');
var request = require("request");

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('friday');

app.launch(function(req,res) {
	res.say("Welcome to Friday home automation bot.  hail hydra!");
	res.shouldEndSession (false, "What would you like to know?  For examples, say help.  To leave ruuvu, say exit.");
});

app.intent('HelpIntent',
    {
        "slots": {},
        "utterances": [
            "help"
        ]
    },
    function (request, response) {
	
	response.say("You can say something like what is the temperature of living room");
    }
);

app.intent('TurnOnTvIntent',
	{
		"slots": {},
		"utterances":["turn on the tv"]
	},
	function(req, response) {
		console.log("Got TurnOnTvIntent intent");

		request("http://localhost:8081/tv-power/on", function(error, res, body) {
		  console.log(body);

                  console.log("Got response from aaron: " + body);
                  response.say(body);
		  response.send();
		});

		// Return false immediately so alexa-app doesn't send the response
    		return false;
	}
);

app.intent('TurnOffTvIntent',
	{
		"slots": {},
		"utterances":["turn off the tv"]
	},
	function(req, response) {
		console.log("Got TurnOffTvIntent intent");
		
                request("http://localhost:8081/tv-power/off", function(error, res, body) {
                  console.log(body);

                  console.log("Got response from aaron: " + body);
                  response.say(body);
		  response.send();
                });

		// Return false immediately so alexa-app doesn't send the response
	    	return false;
	}
);


// ----------------------
// KODI
//-----------------------

app.intent('StartKodiIntent',
        {
                "slots": {},
                "utterances":["start kodi"]
        },
        function(req, response) {
                  console.log("Got StartKodiIntent intent");

                  request("http://localhost:8081/kodi/start", function(error, res, body) {
                  
                  console.log("Got response from aaron: " + body);
                  response.say("OK, Starting Kodi now");
                  response.send();
                });

                // Return false immediately so alexa-app doesn't send the response
                return false;
        }
);

app.intent('StopKodiIntent',
        {
                "slots": {},
                "utterances":["exit kodi"]
        },
        function(req, response) {
                  console.log("Got StopKodiIntent intent");

                  request("http://localhost:8081/kodi/stop", function(error, res, body) {

                  console.log("Got response from froday: " + body);
                  response.say("OK, Stopping Kodi now");
                  response.send();
                });

                // Return false immediately so alexa-app doesn't send the response
                return false;
        }
);


app.intent('StartGenesisIntent',
        {
                "slots": {},
                "utterances":["start genesis"]
        },
        function(req, response) {
                  console.log("Got StartGenesisIntent intent");

                  request("http://localhost:8081/kodi/start/genesis", function(error, res, body) {
                  console.log("Got response from froday: " + body);
                  response.say("OK, Starting genesis now");
                  response.send();
                });

                // Return false immediately so alexa-app doesn't send the response
                return false;
        }
);

//---------------
// SELF
//--------------

app.intent('SelfRestartIntent',
        {
                "slots": {},
                "utterances":["reboot now"]
        },
        function(req, response) {
                  console.log("Got SelfRestartIntent intent");

                  request("http://localhost:8081/self/restart", function(error, res, body) {

                  console.log("Got response from froday: " + body);
                  response.say("OK, Restarting now");
                  response.send();
                });

                // Return false immediately so alexa-app doesn't send the response
                return false;
        }
);

// ---------
// Sensors
// ---------


app.intent('TemperatureIntent',
        {
                "slots": {},
                "utterances":["{what is the|what's the|check the} temperature in living room"]
        },
        function(req, response) {
                  console.log("Got TemperatureIntent intent");

                  request("http://localhost:8081/sensor/temperature", function(error, res, body) {
                   console.log("Got response from froday: " + body);
                   response.say(body);
                   response.send();
                });

                // Return false immediately so alexa-app doesn't send the response
                return false;
        }
);









module.exports = app;


/*
app.intent('NameIntent', {
		"slots":{"NAME":"LITERAL","AGE":"NUMBER"}
		,"utterances":["{My name is|my name's} {matt|bob|bill|jake|nancy|mary|jane|NAME} and I am {1-100|AGE}{ years old|}"]
	},function(req,res) {
		res.say('Your name is '+req.slot('NAME')+' and you are '+req.slot('AGE')+' years old');
	}
);

app.intent('AgeIntent', {
		"slots":{"AGE":"NUMBER"}
		,"utterances":["My age is {1-100|AGE}"]
	},function(req,res) {
		res.say('Your age is '+req.slot('AGE'));
	}
);

app.intent('TemperatureIntent',
	{
		"slots": {},
		"utterances":["{what is|what's} temperature of living room"]
	},
	function(req,res) {
		http.get("http://localhost:8081/currentTemperatureAndHumidity", function(res) {
			// This is async and will run after the http call returns
			response.say(res.statusText);
			// Must call send to end the original request
			response.send();
		});

		// Return false immediately so alexa-app doesn't send the response
    	return false;
	}
);
*/

// http://www.smorgasbork.com/2015/09/06/ruuvu-building-an-alexa-skill-with-alexa-app/
