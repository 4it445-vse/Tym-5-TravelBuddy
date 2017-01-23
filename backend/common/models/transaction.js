'use strict';

module.exports = function(Transaction) {

  Transaction.observe('after save', (ctx, next) => {
    //console.log("after save");
    if(!ctx.isNewInstance){
      if(ctx.instance.Status === "accepted"){

        let filter = {
          where: {"or": [{"and":[{"refUser1": ctx.instance.refBuddyUserId},{"refUser2": ctx.instance.refUserId}]},
                        {"and":[{"refUser1": ctx.instance.refUserId},{"refUser2": ctx.instance.refBuddyUserId}]}]}
        }
        let data = {
          refUser1:ctx.instance.refUserId,
          refUser2:ctx.instance.refBuddyUserId,
          isActive:true
        };

        Transaction.app.models.Connection.findOrCreate(filter, data, (err,instance,created)=>{

        });
      }
    }
    next();
});

};
