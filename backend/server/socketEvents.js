exports = module.exports = function(io,loopbackApp) {
  var usersBySocket = new Map();
  var socketsByUser = new Map();

  io.on('connection', function(socket) {
    console.log('user connected');
    //console.log("channels",socket.adapter.rooms);
    socket.on("hello",(data)=>{
      usersBySocket.set(socket.id,data.userId);
      socketsByUser.set(data.userId,socket.id);

    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
      var user = usersBySocket.get(socket.id);
      usersBySocket.delete(socket.id);
      socketsByUser.delete(user);
    });

    socket.on('new message', function(msg) {
      console.log("message recieved",msg);
      console.log("socketsByUser",socketsByUser);
      console.log("socketID",socketsByUser.get(JSON.stringify(msg.toUserId)));
      var socketToSend = socketsByUser.get(JSON.stringify(msg.toUserId))
      if (socketToSend != undefined) socket.broadcast.to(socketToSend).emit('new message notification', msg);
      else {
        //create notification in database
      }
      socket.broadcast.to(msg.refConnectionId).emit('new inc message', msg);
    });

    socket.on('join channel', function(channel) {
      console.log("join channel",channel);
      socket.join(channel);
    });

    socket.on('leave channel', function(channel) {
      console.log("leave channel",channel);
      socket.leave(channel);
    });

  });
}
