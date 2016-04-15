import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
import passport from 'koa-passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import serve from 'koa-static';

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Steam profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new SteamStrategy({
      returnURL: 'http://localhost:3000/auth/steam/return',
      realm: 'http://localhost:3000/',
      apiKey: '97505E040CF70988B993C6FF6B5F6DA3'
  },
  function(identifier, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {

          // To keep the example simple, the user's Steam profile is returned to
          // represent the logged-in user.  In a typical application, you would want
          // to associate the Steam account with a user record in your database,
          // and return that user instead.
          profile.identifier = identifier;
          console.log('STEAM PROFILE', profile);

          return done(null, profile);
      });
  }
));

// Public routes
let publicRoutes = new Router();
publicRoutes.get('/auth/steam', passport.authenticate('steam'));
publicRoutes.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), function*(ctx) {
    this.redirect('/admin');
});

// Secured routes
let securedRoutes = new Router();
securedRoutes.get('/admin', function*(next) {
    // TODO Populate the redux store with user
    if (this.isAuthenticated()) {
        yield next;
    } else {
        this.redirect('/auth/steam');
    }
});

export default [
    serve(__dirname + '/../public'),
    function*(next) {
        this.app.keys = ['superSecretKey12345'];
        yield next;
    },
    bodyParser(),
    session(),
    passport.initialize(),
    passport.session(),
    publicRoutes.middleware(),
    securedRoutes.middleware()
];
