'use strict';

module.exports = function(Container) {
  Container.afterRemote("upload",(context, modelInstance, next)=>{
    let userId = context.req.accessToken.userId;
    let imageFiles = context.result.result.files.imageFile;

    var modifiedfileName = imageFiles[0].name;

     Container.app.models.UserDetail.findOne({"where" : {"refUserMainId" : userId}},(err, modelInstance)=>{
       if(!err){
         modelInstance.updateAttribute("profilePicture",modifiedfileName,(err,instance)=>{
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
}
