var express = require('express');
var kat = require('kickass-api');
var filesize = require("filesize");
var http = require('http');
var fs = require('fs');
var path = require('path');
var Transmission = require('transmission');
var request = require('request');
var dht = require('./lib/sensors/temperature/dht.js');
var kodi = require('./lib/kodi/index.js').Kodi;
var util = require('./lib/util.js').Util;
var dht = require('./lib/sensors/temperature/dht.js').Dht

var app = express();
app.locals.filesize = filesize

var searchResult = null;

app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

exports.startServer = function(input) {
	var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port
		console.log("Webserver listening at http://%s:%s", host, port)
	})
};


// List all torrent files
//http://localhost:8081/t/search?q=whatever
app.get('/t/search', function(req, res) {
    var searchFor =   req.query.q;
    console.log("Search for torrents with: " + searchFor);

    kat.search({
        query: "'" + searchFor + "'",
        sort_by: 'seeders'
    }).then(function (response) {
        searchResult = response.results
        res.render('pages/search', {searchFor:searchFor, data: searchResult});
    }).catch(function (error) {
        console.log(error);
        res.send(error);
    });
});

// for kankun power socket. http://192.168.1.103/cgi-bin/json.cgi
app.get('/tv-power/on', function(req, res) {
  request("http://192.168.1.103/cgi-bin/json.cgi?set=on", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send("OK, Turning on the TV now");
    }
  });
});

app.get('/tv-power/off', function(req, res) {
  request("http://192.168.1.103/cgi-bin/json.cgi?set=off", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send("OK, Turning off the TV now");
    }
  });
});

app.get('/tv-power/status', function(req, res) {
  request("http://192.168.1.103/cgi-bin/json.cgi?get=state", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

// -- KODI

app.get('/kodi/start', function(req, res) {
 console.log("Starting Kodi");
 kodi.start();
 res.send("OK, Starting Kodi now");
});

app.get('/kodi/stop', function(req, res) {
 console.log("Quit Kodi");
 kodi.stop();
 res.send("OK, Stopping Kodi now");
});

app.get('/kodi/start/genesis', function(req, res) {
 console.log("Got start Genesis request");
 kodi.startGenesis();
 res.send("OK, Starting genesis now");
});


// -- SELF

app.get('/self/restart', function(req, res) {
 console.log("Restarting now..");
 res.send("OK, Restarting now");

 util.exec("shutdown -r now", function () {
     console.log("rebooting now ..");
 });
});

// -- SENSORS
app.get('/sensor/temperature', function(req, res) {
 dht.read(function(str) {
   res.send(str);
 });
});


// -- TORRENTS

//http://localhost:8081/t/download?id=0
app.get('/t/download', function(req, res) {
    var id = req.query.id;

    if(searchResult[id]) {
      var torrentLink = searchResult[id].torrentLink;
      console.log(searchResult[id]);

      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write("Adding " + searchResult[id].title + " to transmission now ...! </br>");

      var transmission = new Transmission({
      	port : 9091,
      	host : '192.168.1.105',
        username: 'admin',
        password: '123'
      });

      transmission.addUrl(torrentLink, function(err, result) {
      	if (err) {
      		console.log(err)
          res.write(err);
          res.end();
      	}
        else {
          var id = result.id
          res.write('Just added a new torrent.')
          res.write('Torrent ID: ' + id)
          res.end();
        }
      });
    }
    else {
      res.send("ID not found!");
    }
});
