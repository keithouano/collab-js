// Connect to the nodeJs Server
io = io.connect('/');

var sessionId = 'none';

console.log( "socket: browser says ping (1)" )
io.emit('ping', { some: 'data' } );

io.on('pong', function (data) {
	console.log( 'socket: server said pong (4)', data );
});

io.on('start', function (data) {
	sessionId = data
});


// -----------------
// Emit
// Use to inform the server of user events
// -----------------
function emit(eventName, data) {
  // console.log('socket emitting ...', eventName, data);
  io.emit(eventName, data, sessionId);
}

// -----------------
// On
// Draw other users paths
// -----------------
io.on( 'startPath', function( data, sessionId ) {
  startPath(data, sessionId);
})

io.on( 'continuePath', function( data, sessionId ) {
  continuePath(data, sessionId)
})

io.on( 'endPath', function( data, sessionId ) {
  endPath(data, sessionId);
})

// -----------------
// On
// Write Text Node
// -----------------
io.on( 'writeTextNode', function( data, sessionId ) {
  writeTextNode(data, sessionId);
})

