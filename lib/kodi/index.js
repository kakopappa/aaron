var util = require('../util.js').Util;
var kodiws = require('kodi-ws');
var Kodi = function() {}; 

Kodi.prototype.start = function () {
    util.exec("sudo kodi", function (result) {
      console.log("Start Kodi command result:" + result);
    });
};

Kodi.prototype.stop = function () {
  kodiws('localhost', 9090).then(function(connection) {
    console.log("stop Kodi ..");
    connection.Application.Quit();
  });
};


Kodi.prototype.startGenesis = function () {
  kodiws('localhost', 9090).then(function(connection) {
    console.log("start Genesis plugin ..");
    connection.Addons.ExecuteAddon("plugin.video.genesis");
  });
} 

exports.Kodi = new Kodi();


// List all addons
// http://192.168.1.105:8080/jsonrpc?request={"jsonrpc": "2.0", "id":1, "method": "Addons.GetAddons", "params": {}}

// Start Genesis
// {"jsonrpc": "2.0", "method": "Addons.ExecuteAddon", "params": { "addonid": "plugin.video.genesis"}, "id": 1 } 


// http://kodi.wiki/view/JSON-RPC_API/v6
/*
module.exports = function start() {
  console.log('Inside start');

  run_cmd("kodi", "", function () {
        console.log("start Kodi ..");
        callBack();
  })
}

module.exports = function quit() {
  kodiws('localhost', 9090).then(function(connection) {
    console.log("quit Kodi ..");
    connection.Application.Quit();
  });
}

 // status = true or false
module.exports = function setMute(status) {
  kodiws('localhost', 9090).then(function(connection) {
    console.log("Kodi mute " + status);
    connection.Application.SetMute(status);
  });
}

module.exports = function setVolume(volume, callBack) {
  kodiws('localhost', 9090).then(function(connection) {
    console.log("Kodi set volume " + volume);
    connection.Application.SetVolume(volume);
  });
}
*/
