
var express     = require("express"),
    socket      = require('socket.io'),
    fs          = require('fs'),
    http        = require('http'),
    config      = require('./serverconfig.js');

var settings    = config.settings;

console.log('settings', settings);

var app = express();
var server = app.listen(settings.port);

// Config Express to server static files from /
// app.configure(function(){
  app.use(express.static(__dirname + '/'));
// });

// App Server and Routes
require('./core/app')(app);

// LISTEN FOR REQUESTS
require('./core/io')(socket, server, settings);

console.log("Access Etherdraw at http://"+settings.ip+":"+settings.port);
