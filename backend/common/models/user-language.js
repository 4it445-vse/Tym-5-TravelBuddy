'use strict';

module.exports = function(Userlanguage) {

  Userlanguage.beforeRemote("create", function(ctx, unused, next) {
    //console.log('---beforeRemote create Userlangue', ctx.req.body);
    //console.log(ctx.args);
    //var data = [{refUserId:5,refLanguageId:5},{refUserId:5,refLanguageId:5}];
    //ctx.args.data = data;
    //ctx.req.body = {refUserId:3,refLanguageId:4};
    //console.log('---beforeRemote create Userlangue', ctx.req.body);
    //console.log('---beforeRemote create Userlangue', ctx.args);
    let userId = ctx.req.accessToken.userId;
    ctx.args.data.refUserId = userId;

    next();
  });

  Userlanguage.beforeRemote("update", function(ctx, modelInstance, next) {
    // Userlanguage.language.destroyAll(function(err) {
    //
    // });
    console.log('--- beforeRemote Update FIRED');
  });

};
