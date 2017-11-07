"use strict";

// Express requires these dependencies
const express = require('express')
const http = require('http')
const path = require('path');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const socketIO = require('socket.io')

const app = express();

// Configure our application
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = http.createServer(app);
server.listen(process.env.PORT || 3000, function() {
	console.log('Listening on port ' + server.address().port);
});

// Enable Socket.io
var io = socketIO.listen( server );

// A user connects to the server (opens a socket)
io.sockets.on('connection', function (socket) {
  
  console.log('connected user')
  var sessId = uuidv4() 

  socket.emit( 'start', sessId);
  console.log('connected user with sessId -----> ', sessId)
  
  // A User starts a path
  socket.on( 'startPath', function( data, sessionId ) {
    socket.broadcast.emit( 'startPath', data, sessionId );
  });

  // A User continues a path
  socket.on( 'continuePath', function( data, sessionId ) {
    socket.broadcast.emit( 'continuePath', data, sessionId );
  });

  // A user ends a path
  socket.on( 'endPath', function( data, sessionId ) {
    socket.broadcast.emit( 'endPath', data, sessionId );
  });  

});