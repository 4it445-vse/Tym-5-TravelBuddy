'use strict';

module.exports = function(EshopProduct) {
  EshopProduct.withCategory = function(callback) {
    EshopProduct.find({ include: 'category' }, function(err, products) {
      if (err) { return callback(err); }

      callback(null, products);
    })
  }

  EshopProduct.remoteMethod(
      'withCategory',
      {
        accepts: [],
        http: {
          verb: 'get',
        },
        returns: {
          arg: 'products',
          type: '[EshopProduct]',
          root: true,
        },
      }
  );
};
