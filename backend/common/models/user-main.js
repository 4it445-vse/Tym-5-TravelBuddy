'use strict';

const {
  API_HOST,
  API_PORT,
  API_PROTOCOL,
  VERIFY_EMAIL_REDIRECT
} = process.env;

module.exports = function(Usermain) {

  /*
   * send verification email after registration
   */
  Usermain.afterRemote('create', function(context, usermain, next) {
    console.log('> Usermain.afterRemote triggered');

    var options = {
      type: 'email',
      to: usermain.email,
      from: 'noreply@travelbuddy.com',
      subject: 'Travel Buddy | Verify email',
      template: 'server/views/verify.ejs',
      redirect: VERIFY_EMAIL_REDIRECT,
      user: usermain,
      host: API_HOST,
      port: API_PORT,
      protocol: API_PROTOCOL
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
   * update info after successful login
   */
   Usermain.afterRemote('login', function(context, usermain, next) {
     console.log('> Usermain.afterRemote "login" triggered', usermain);
     //update lastLoginDate
     Usermain.updateAll({id: usermain.userId}, {lastLoginDate: new Date()} ,function(err, response) {
       if (err) {
         next(err);
       } else {
        next();
       }
     });
   });

}
