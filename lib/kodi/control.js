var run_cmd = require('../util.js').run_cmd;
var kodi = require('kodi-ws');

// http://kodi.wiki/view/JSON-RPC_API/v6

module.exports = function start(callBack) {
  run_cmd("kodi", "", function () {
        console.log("start Kodi ..");
        callBack();
  })
}

module.exports = function quit(callBack) {
  kodi('localhost', 9090).then(function(connection) {
    console.log("quit Kodi ..");
    connection.Application.Quit();
    callBack();
  });
}

 // status = true or false
module.exports = function setMute(status, callBack {
  kodi('localhost', 9090).then(function(connection) {
    console.log("Kodi mute " + status);
    connection.Application.SetMute(status);
    callBack();
  });
}

module.exports = function setVolume(volume, callBack) {
  kodi('localhost', 9090).then(function(connection) {
    console.log("Kodi set volume " + volume);
    connection.Application.SetVolume(volume);
    callBack();
  });
}
