'use strict';

module.exports = function(Connection) {

  Connection.afterRemote("*.__create__messages",(context,messageInstance,next)=>{
    console.log("after create messages");
    console.log(messageInstance);

    Connection.findById(messageInstance.refConnectionId,(err,connInstance)=>{
      if (!err){
        connInstance.updateAttribute("lastMessageDate",messageInstance.recordCreated,(err,updatedInstance)=>{
          if(!err){
            next();
          }else{
            next(err);
          }
        });
      }else{
        next(err);
      }
    });
  });

};
