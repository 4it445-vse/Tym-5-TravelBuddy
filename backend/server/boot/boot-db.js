'use strict';

// module.exports = function(app) {
//   app.dataSources.mysqlds.autoupdate('UserMain', function(err) {
//     const { UserMain } = app.models;
//     if (!UserMain) { return; }
//
//     UserMain.count({}, function(err, count) {
//       if (count !== 0) { return };
//
//       UserMain.create([
//         {
//           firstName: 'Rocky',
//           lastName: 'Balboa',
//           email: 'rocky@balboa.com',
//           password: 'rocky123'
//         }
//       ], function(err, users) {
//         if (err) throw err;
//
//         console.log('Models created: \n', users);
//       });
//     });
//   });
//
//   app.dataSources.mysqlds.autoupdate('UserDetail', function(err) {
//
//     const { UserDetail } = app.models;
//     if (!UserDetail) { return; }
//
//     UserDetail.count({}, function(err, count) {
//       if (count !== 0) { return };
//
//     });
//   });
//
// };

module.exports = function(app) {
    var path = require('path');
    var models = require(path.resolve(__dirname, '../model-config.json'));
    var datasources = require(path.resolve(__dirname, '../datasources.json'));

    function autoUpdateAll(){
        Object.keys(models).forEach(function(key) {
            if (typeof models[key].dataSource != 'undefined') {
                if (typeof datasources[models[key].dataSource] != 'undefined') {
                    app.dataSources[models[key].dataSource].autoupdate(key, function (err) {
                        if (err) throw err;
                        console.log('Model ' + key + ' updated');
                    });
                }
            }
        });
    }

    function autoMigrateAll(){
        Object.keys(models).forEach(function(key) {
            if (typeof models[key].dataSource != 'undefined') {
                if (typeof datasources[models[key].dataSource] != 'undefined') {
                    app.dataSources[models[key].dataSource].automigrate(key, function (err) {
                        if (err) throw err;
                        console.log('Model ' + key + ' migrated');
                    });
                }
            }
        });
    }

};


  // We dont want to create built-in User table yet
  // app.dataSources.mysqlds.autoupdate('User', function(err) {
  //   const { User } = app.models;
  //   if (!User) { return; }
  // });
