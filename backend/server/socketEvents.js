exports = module.exports = function(io,loopbackApp) {
  var socketsByUser = new Map();
  var usersBySocket = new Map();

  io.on('connection', function(socket) {
    console.log('user connected');
    //console.log("socketsByUser",socketsByUser);
    //console.log("sockets",io.sockets.sockets);
    socket.on("hello",(data)=>{
      if(data.userId){
        //console.log("type",typeof data.userId);
        //console.log("type",typeof socket.id);
        socketsByUser.set(data.userId,socket.id);
        usersBySocket.set(socket.id,data.userId)
        //console.log("usersBySocket",usersBySocket);
        //console.log("socketsByUser",socketsByUser);
      }
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
      let socketUser = usersBySocket.get(socket.id);
      usersBySocket.delete(socket.id);
      socketsByUser.delete(socketUser);
    });

    socket.on('new message', function(msg) {

      //console.log("message recieved",msg);
      //console.log("socketsByUser",socketsByUser);
      //console.log("msg",msg.toUserId);
      //console.log("type",typeof msg.toUserId);

      var socketToSend = socketsByUser.get(msg.toUserId.toString());
      console.log("socketToSend",socketToSend);
      if (socketToSend != undefined) {
        socket.broadcast.to(socketToSend).emit('new message notification', msg);

        //console.log("sending notification to",socketToSend);
        //console.log("scket room",io.sockets.sockets[socketToSend].rooms[msg.refConnectionId]);
        //console.log("index", socket.rooms[msg.refConnectionId]);

        if (!io.sockets.sockets[socketToSend].rooms[msg.refConnectionId]){
          console.log("creating notification");
          //create notification in database
          let notification = {refUserId:msg.toUserId,refConnectionId:msg.refConnectionId};
          let filter = {where:{"refConnectionId": msg.refConnectionId}};
          loopbackApp.models.ChatNotification.findOrCreate(filter,notification,(err,obj,created)=>{
            if (!err){
              if (created) {
                console.log("created chat notification", obj);
              }
              else {
                  if (obj.refUserId !== msg.toUserId){
                    obj.updateAttribute("refUserId",msg.toUserId,(err,updatedInstance)=>{

                    });
                  }
                }
              }
            });
          }
        }else{
          //create notification in database
          let notification = {refUserId:msg.toUserId,refConnectionId:msg.refConnectionId};
          let filter = {where:{"refConnectionId": msg.refConnectionId}};
          loopbackApp.models.ChatNotification.findOrCreate(filter,notification,(err,obj,created)=>{
            if (!err){
              if (created) {
                console.log("created chat notification", obj);
              }
              else {
                  if (obj.refUserId !== msg.toUserId){
                    obj.updateAttribute("refUserId",msg.toUserId,(err,updatedInstance)=>{

                    });
                  }
                }
              }
            });
        }

      socket.broadcast.to(msg.refConnectionId).emit('new inc message', msg);
    });

    socket.on('join channel', function(channel) {
      //console.log("join channel",channel);
      socket.join(channel);

      let filter = {where:{"and":[{"refConnectionId": channel},{"refUserId":usersBySocket.get(socket.id)}]}};
      loopbackApp.models.ChatNotification.findOne(filter,(err,instance)=>{
        if (!err){
          if (instance){
            instance.destroy();
            //console.log("instance deleted",instance);
          }
        }
      });
    });

    socket.on('leave channel', function(channel) {
      //console.log("leave channel",channel);
      socket.leave(channel);
    });

    socket.on("forceDisconnect",()=>{
      socket.disconnect();
    });

  });
}
