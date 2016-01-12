var AlexaAppServer = require('alexa-app-server');

exports.startAlexaAppServer = function() {
    AlexaAppServer.start( {
		httpsPort:443,
		httpsEnabled:true,
		privateKey:'private-key.pem',
		certificate:'cert.cer'
		
		// Use preRequest to load user data on each request and add it to the request json.
		// In reality, this data would come from a db or files, etc.
		,preRequest: function(json,req,res) {
			console.log("preRequest fired");
			//json.userDetails = { "name":"Bob Smith" };
		}
		// Add a dummy attribute to the response
		,postRequest: function(json,req,res) {
			//json.dummy = "text";
		}
	} );
};


