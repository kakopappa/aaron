var alexa = require('alexa-app');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('aaron');

app.launch(function(req,res) {
	res.say("Welcome to Aaron.  Heil Hitler!");
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

module.exports = app;


// http://www.smorgasbork.com/2015/09/06/ruuvu-building-an-alexa-skill-with-alexa-app/