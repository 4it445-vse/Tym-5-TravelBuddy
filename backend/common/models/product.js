'use strict';

module.exports = function(Product) {
  Product.beforeRemote("create",(context, unused, next)=>{
    console.log("beforeCreate",context.req.body);

    // isert user id to Product because user can add only his own products
    let userId = context.req.accessToken.userId;
    context.req.body.refOwnedUserId = userId;

    //TODO check inputs....

    next();
  });
}
