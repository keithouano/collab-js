
module.exports = function (socket, server, settings) {
  var io = socket.listen(server);
    io.sockets.setMaxListeners(0);
    
  /** 
  * Build Client Settings that we will send to the client
  */
  var clientSettings = {
    "tool": "brush"
  }

  // SOCKET IO
  io.sockets.on('connection', function (socket) {

    socket.on('disconnect', function () {
      console.log("Socket disconnected");
    });
    
    // User joins a room
    socket.on('subscribe', function(data) {
      var room = data.room;

      socket.join(room);
      socket.emit('settings', clientSettings);
    
      // Broadcast to room the new user count -- currently broken
      var rooms = socket.adapter.rooms[room]; 
      var roomUserCount = Object.keys(rooms).length;
      io.to(room).emit('user:connect', roomUserCount);
      
    });

    // User clears canvas
    socket.on('canvas:clear', function(room) {
      io.in(room).emit('canvas:clear');
    });

    // Event: Drawing
    socket.on('draw:start', function (room, uid, co_ordinates) {
      io.in(room).emit('draw:start', uid, co_ordinates);
    });
    socket.on('draw:progress', function (room, uid, co_ordinates) {
      io.in(room).emit('draw:progress', uid, co_ordinates);
    });
    socket.on('draw:end', function (room, uid, co_ordinates) {
      io.in(room).emit('draw:end', uid, co_ordinates);
    });

    // Event: Item
    socket.on('item:remove', function(room, uid, itemName) {
      io.sockets.in(room).emit('item:remove', uid, itemName);
    });
    socket.on('item:move:progress', function(room, uid, itemNames, delta) {
      if (itemNames) {
        io.sockets.in(room).emit('item:move', uid, itemNames, delta);
      }
    });
    socket.on('item:move:end', function(room, uid, itemNames, delta) {
      if (itemNames) {
        io.sockets.in(room).emit('item:move', uid, itemNames, delta);
      }
    });
    
    // Event: Image
    socket.on('image:add', function(room, uid, data, position, name) {
      io.sockets.in(room).emit('image:add', uid, data, position, name);
    });

  });

}