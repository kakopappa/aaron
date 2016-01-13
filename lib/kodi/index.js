var run_cmd = require('../util.js').run_cmd;
var kodi = require('kodi-ws');

// http://kodi.wiki/view/JSON-RPC_API/v6

module.exports = function start() {
  run_cmd("kodi", "", function () {
        console.log("start Kodi ..");
        callBack();
  })
}

module.exports = function quit() {
  kodi('localhost', 9090).then(function(connection) {
    console.log("quit Kodi ..");
    connection.Application.Quit();
  });
}

 // status = true or false
module.exports = function setMute(status) {
  kodi('localhost', 9090).then(function(connection) {
    console.log("Kodi mute " + status);
    connection.Application.SetMute(status);
  });
}

module.exports = function setVolume(volume, callBack) {
  kodi('localhost', 9090).then(function(connection) {
    console.log("Kodi set volume " + volume);
    connection.Application.SetVolume(volume);
  });
}
