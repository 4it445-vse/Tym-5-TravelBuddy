'use strict';

module.exports = function(app) {
  app.dataSources.mysqlds.autoupdate('EshopCategory', function(err) {
    const { EshopCategory } = app.models;
    if (!EshopCategory) { return; }

    EshopCategory.count({}, function(err, count) {
      if (count !== 0) { return };

      EshopCategory.create([
        {
          name: 'Car',
        },
        {
          name: 'Motorbike',
        }
      ], function(err, categories) {
        if (err) throw err;

        console.log('Models created: \n', categories);
      });
    });
  });

  app.dataSources.mysqlds.autoupdate('EshopProduct', function(err) {
    const { EshopProduct } = app.models;
    if (!EshopProduct) { return; }

    EshopProduct.count({}, function(err, count) {
      if (count !== 0) { return; }

      EshopProduct.create([
          {
            title: 'Škoda Superb',
            price: 750000,
            shortInfo: 'Luxury car produced in the Czech Republic.',
            categoryId: 1,
          },
          {
            title: 'Ford Focus',
            price: 600000,
            shortInfo: 'Sports car made in USA.',
            categoryId: 1,
          },
          {
            title: 'Moped',
            price: 1000,
            shortInfo: 'No comment.',
            categoryId: 2,
          },
      ], function(err, products) {
        if (err) throw err;

        console.log('Models created: \n', products);
      });
    });
  });
};
