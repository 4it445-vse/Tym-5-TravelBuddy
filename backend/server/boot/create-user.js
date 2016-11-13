'use strict';

module.exports = function(app) {
    const { UserMain } = app.models;
    if (!UserMain) { return; }

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

};
