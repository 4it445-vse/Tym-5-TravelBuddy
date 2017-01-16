'use strict';

module.exports = function(Container) {
  Container.afterRemote("upload",(context, modelInstance, next)=>{
    let userId = context.req.accessToken.userId;
    let imageFiles = context.result.result.files.imageFile;

    var modifiedfileName = imageFiles[0].name;
    console.log('--- ctx args', context.req.query);
    switch(context.req._parsedUrl.pathname) {
      //Profile picture upload
      case "/profilePictures/upload":
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
        break;
      //Product's picture upload
      case "/productPictures/upload":
        let productId = context.req.query.productId;
        Container.app.models.Product.findOne({"where" : {"id" : productId}},(err, modelInstance)=>{
          if(!err){
            modelInstance.updateAttribute("picture",modifiedfileName,(err,instance)=>{
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
        break;

      //default
      default:
        return;

    }

  });

  // Container.beforeRemote("upload", function(ctx, unused, next){
  //   console.log('---before remote ctx args', ctx.args.productId);
  // });
}
