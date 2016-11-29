'use strict';

const {
  API_HOST,
  API_PORT,
  API_PROTOCOL,
  VERIFY_EMAIL_REDIRECT
} = process.env;

module.exports = function(Usermain) {

  Usermain.validatesPresenceOf('gender', 'birthdate');

  Usermain.submit = function(firstName, lastName, birthdate, gender, email, password, password2, callback) {

    const user = Usermain({
      firstName,
      lastName,
      birthdate,
      gender,
      email,
      password,
      password2
    });

    user.isValid(userIsValid => {
      let anyErrors = false;
      const errors = {};
      console.log('--- user valid', userIsValid);
      if (!userIsValid) {
        anyErrors = true;
        Object.assign(errors, user.errors);
      }
      if (password !== password2) {
        Object.assign(errors, {password: ['Passwords are not same!']});
      }
      if (password && password.length < 6) {
        Object.assign(errors, {password: ['Password is too short!']})
      }
      if (!gender) {
        Object.assign(errors, {gender: ['Choose your gender!']});
      }
      if (email) {
        const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
        if (!emailPattern.test(email)) {
          console.log('--- email invalid');
          Object.assign(errors, {email: ['Enter a valid email!']});
        }
      }
      if (!birthdate) {
        Object.assign(errors, {birthdate: ['Please enter your birthdate!']});
      }

      if (anyErrors) {
        callback({
          statusCode: 422,
          message: 'Error',
          details: {
            errors,
          },
        });
        return;
      }
      Usermain.create(user);
      callback(null, { user });
    });
  };

  /*
   * send verification email after registration
   */
   Usermain.afterCreate = function(next) {
     console.log('> Usermain.afterRemote create triggered');

     var options = {
       type: 'email',
       to: this.email,
       from: 'noreply@travelbuddy.com',
       subject: 'Travel Buddy | Verify email',
       template: 'server/views/verify.ejs',
       redirect: VERIFY_EMAIL_REDIRECT,
       user: this,
       host: API_HOST,
       port: API_PORT,
       protocol: API_PROTOCOL
     };

     // console.log('---- options', options);

     this.verify(options, function(err, response) {
       if (err) {
         next(err);
       } else {
         next();
       }

       console.log('> verification email sent:', response);

     });

     next();
   }

   /*
   * update info after successful login
   */
  // TODO This implementation is causing problems with authorization, it NEEDS to be remade!!
  //  Usermain.afterRemote('login', function(context, usermain, next) {
  //    console.log('> Usermain.afterRemote "login" triggered', usermain);
  //    //update lastLoginDate
  //    Usermain.updateAll({id: usermain.userId}, {lastLoginDate: new Date()} ,function(err, response) {
  //      if (err) {
  //        next(err);
  //      } else {
  //        next();
  //      }
  //    });
  //  });

}
