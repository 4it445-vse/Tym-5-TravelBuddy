'use strict';

module.exports = function(app) {
  app.dataSources.mysqlds.autoupdate('UserMain', function(err) {
    const { UserMain } = app.models;
    if (!UserMain) { return; }

    UserMain.count({}, function(err, count) {
      if (count !== 0) { return };

      UserMain.create([
        {
          firstName: 'Rocky',
          lastName: 'Balboa',
          email: 'rocky@balboa.com',
          password: 'rocky123'
        }
      ], function(err, users) {
        if (err) throw err;

        console.log('Models created: \n', users);
      });
    });
  });

  // We dont want to create built-in User table yet
  // app.dataSources.mysqlds.autoupdate('User', function(err) {
  //   const { User } = app.models;
  //   if (!User) { return; }
  // });
};
