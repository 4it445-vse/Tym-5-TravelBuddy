'use strict';

module.exports = function(Usermain) {

  //send verification email after registration
  Usermain.afterRemote('create', function(context, usermain, next) {
    console.log('> Usermain.afterRemote triggered');

    var options = {
      type: 'email',
      to: usermain.email,
      from: 'noreply@loopback.com',
      subject: 'Thanks for registering.',
      template: 'common/views/verify.ejs',
      redirect: '/verified',
      user: usermain
    };

    console.log('---- options', options);

    Usermain.sendMail = function(cb) {
      Usermain.app.models.Email.send({
        to: 'martinecekjevul@seznam.cz',
        from: 'noreply@travelbuddy.com',
        subject: 'test',
        text: 'test text',
        html: '<b>test</b>'
      }, function(err, mail) {
        console.log('mail sent!');
        cb(err);
      });
    }

    usermain.verify(options, function(err, response) {
      if (err) {
        next(err);
      } else {
        next();
      }

      console.log('> verification email sent:', response);

      context.res.render('response', {
        title: 'Signed up successfully',
        content: 'Please check your email and click on the verification link ' -
            'before logging in.',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });
    });
  });

};
