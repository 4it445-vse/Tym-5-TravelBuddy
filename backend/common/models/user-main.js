'use strict';

module.exports = function(Usermain) {

  //send verification email after registration
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

      //TODO
      //this code is returning "unhandled error for request post failed to lookup view response in views directory"

      // context.res.render('response', {
      //   title: 'Signed up successfully',
      //   content: 'Please check your email and click on the verification link ' -
      //       'before logging in.',
      //   redirectTo: '/',
      //   redirectToLinkText: 'Log in'
      // });
    });
  });

};
