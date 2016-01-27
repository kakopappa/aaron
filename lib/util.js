var Util = function() {}; 

Util.prototype.exec = function(cmd, callback) {
	var child_process = require('child_process');
	var exec = child_process.exec;

	exec(cmd, function(err, stout, stderr) {
	  if (err) {
	    console.log('Child process exited with error code' + err.code + '. Err: ' + stderr);
	    callback('Child process exited with error code ' + err.code);
	    return;
	  }

	  console.log(stout);	
	  callback(stout);	
	});
};


exports.Util = new Util();

