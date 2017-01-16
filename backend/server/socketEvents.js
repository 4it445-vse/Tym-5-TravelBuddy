exports = module.exports = function(io,loopbackApp) {
  io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('new message', function(msg) {
      console.log("message recieved",msg);

      //loopbackApp.models.message.create()


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
