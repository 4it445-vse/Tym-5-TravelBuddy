'use strict';

module.exports = function(Usermain) {

  /*
   * send verification email after registration
   */
  Usermain.afterRemote('create', function(context, usermain, next) {
    console.log('> Usermain.afterRemote triggered');


    //TODO:
    // - localhost for local dev is hardcoded
    // - currently email is sent from gmail account and not from noreply@travelbuddy.com
    var options = {
      type: 'email',
      to: usermain.email,
      from: 'noreply@travelbuddy.com',
      subject: 'Travel Buddy | Verify email',
      template: 'server/views/verify.ejs',
      redirect: 'http://localhost:3000/verified',
      user: usermain
    };

    console.log('---- options', options);

    usermain.verify(options, function(err, response) {
      if (err) {
        next(err);
      } else {
        next();
      }

      console.log('> verification email sent:', response);

    });
  });

  /*
   * update lastLoginDate after successful login
   */
   Usermain.afterRemote('login', function(context, usermain, next) {
     console.log('> Usermain.afterRemote "login" triggered', usermain);
     Usermain.updateAll({id: usermain.userId}, {lastLoginDate: new Date()} ,function(err, response) {
       if (err) {
         next(err);
       } else {
         next();
       }
     });
   });

}

