import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
import passport from 'koa-passport';
import json from 'koa-json';
import serve from 'koa-static';
import SessionStore from 'koa-generic-session-file';
import { Strategy as SteamStrategy } from 'passport-steam';
import { User } from './database';
import api from './api';

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
          console.log('STEAM PROFILE', profile);

          // Check if user exists
          User.findOne({ where: {steamId: profile.id} }).then(function (user) {
              if (user) {
                  return done(null, user);
              // If not create it
              } else {
                  User.create({
                      steamId: profile.id,
                      username: profile.displayName,
                      avatar: profile.photos.length > 0 ? profile.photos[0].value : null
                  }).then(function(user) {
                      return done(null, user);
                  });
              }
          });

          return done(null, profile);
      });
  }
));

// Public routes
let publicRoutes = new Router();
publicRoutes.get('/auth/steam', passport.authenticate('steam'));
publicRoutes.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), function*(ctx) {
    this.redirect('/app');
});

// Secured routes
let securedRoutes = new Router();
securedRoutes.get('/app/*', function*(next) {
    // TODO Populate the redux store with user
    if (this.isAuthenticated(   )) {
        yield next;
    } else {
        this.redirect('/auth/steam');
    }
});
securedRoutes.use('/api', json(), function*(next) {
    if (this.isAuthenticated()) {
        yield next;
    } else {
        this.status = 401;
        this.body = {error: 'Not authorized'};
    }
}, api.routes(), api.allowedMethods());

export default [
    serve(__dirname + '/../public'),
    function*(next) {
        this.app.keys = ['superSecretKey12345'];
        yield next;
    },
    bodyParser(),
    session({
        store: new SessionStore(),
        cookie: {httpOnly: false}
    }),
    passport.initialize(),
    passport.session(),
    publicRoutes.middleware(),
    securedRoutes.middleware(),
    function*(next) {
        let store = this.state.store;
        // Populate user in the store
        store.dispatch({ type: 'USER', user: this.req.user });
        store.dispatch({ type: 'INCREMENT' });
        yield next;
    }
];
