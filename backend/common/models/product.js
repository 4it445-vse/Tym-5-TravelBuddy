'use strict';

module.exports = function(Product) {

  Product.afterRemoteError("**", function(ctx, next) {
  console.log("ee",ctx.error);
  console.log(ctx.req.accessToken);
  next();
  });
  Product.beforeRemote("**", function(ctx, next) {
  console.log("ee",ctx);
  console.log(ctx.req);
  console.log(ctx.req.accessToken);
  next();
  });

}
