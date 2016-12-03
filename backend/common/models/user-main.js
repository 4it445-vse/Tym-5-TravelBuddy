'use strict';

const {
  API_HOST,
  API_PORT,
  API_PROTOCOL,
  VERIFY_EMAIL_REDIRECT
} = process.env;

const MAX_PASSWORD_LENGTH = 32;

module.exports = function(Usermain) {

  //This actually seeks to do nothing despite doc description
  Usermain.validatesPresenceOf('gender', 'birthdate', 'password');

  Usermain.submit = function(
      firstName, lastName, birthdate, gender, email, password, password2,
      agreeToTerms, callback
    ) {

    const user = Usermain({
      firstName,
      lastName,
      birthdate,
      gender,
      email,
      password,
      password2,
      agreeToTerms
    });

    user.isValid(userIsValid => {
      let anyErrors = false;
      const errors = {};
      console.log('--- user valid', userIsValid);
      if (!userIsValid) {
        anyErrors = true;
        console.log('--- errors', user.errors);
        Object.assign(errors, user.errors);
      }

      Object.assign(errors, Usermain.validatePassword(password));

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
      if (!agreeToTerms) {
        Object.assign(errors, {agreeToTerms: ['You must agree to terms!']});
      }
      //TODO this is stupid workaround to get date validation working. Frontend
      //sends date 01-01-1001 indicating error, which is still valid date and real
      //error is created here. It could be validates Frontend-only but this is preparation
      //for backend-only solution
      if (birthdate < Date.parse("12/31/1001")) {
        Object.assign(errors, {birthdate: ['Enter a valid birthdate!']});
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
   * override built-in user model function
   */
  Usermain.validatePassword = function(plain) {
    var err;
    if (plain && typeof plain === 'string' && plain.length <= MAX_PASSWORD_LENGTH) {
      return;
    }
    if (!plain || plain == undefined) {
      return {password: ['Required']};
    }
    if (plain.length > MAX_PASSWORD_LENGTH) {
      return {password: ['Password is too long!']};
    }
  };

  // Usermain.observe('before save', function beforeSaveUsermainValidation(ctx, next) {
  //   console.log('--- op hook before save fired', ctx);
  // });

  Usermain.beforeRemote('submit', function(ctx, unused, next) {
    console.log('---beforeRemote submit fired', ctx.args);
    if (ctx.args.birthdate === "Invalid Date") {
      ctx.args.birthdate = "01-01-1000";
    }
    next();
  });

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
