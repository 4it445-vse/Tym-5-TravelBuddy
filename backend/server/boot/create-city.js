'use strict';

module.exports = function(app) {
  app.dataSources.mysqlds.autoupdate('City', function(err) {
    const { City } = app.models;
    if (!City) { return; }

    City.count({}, function(err, count) {
      if (count !== 0) { return };

      City.create([
        {
          name: 'Prague',
          code: 'PRG',
          refCityCountryId: '56'
        }
      ], function(err, cities) {
        if (err) throw err;

        console.log('Models created: \n', cities);
      });
    });
  });
  app.dataSources.mysqlds.autoupdate('City', function(err) {
    const { City } = app.models;
    if (!City) { return; }
  });
};
