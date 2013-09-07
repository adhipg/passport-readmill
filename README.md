# Passport-Readmill

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating
with [Readmill](http://readmill.com/) using the OAuth 2.0 API.

This module lets you authenticate using Instagram in your Node.js applications.
By plugging into Passport, Instagram authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-readmill

## Usage

#### Configure Strategy

The Readmill authentication strategy authenticates users using a Readmill
account and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a client ID, client secret, and callback URL.

    passport.use(new ReadmillStrategy({
        clientID: READMILL_CLIENT_ID,
        clientSecret: READMILL_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/readmill/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ readmillId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'readmill'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/readmill',
      passport.authenticate('readmill'));

    app.get('/auth/readmill/callback', 
      passport.authenticate('readmill', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

For a complete, working example, refer to the [login example](https://github.com/adhipg/passport-readmill/tree/master/examples/login).

## Credits

  - [Adhip Gupta](http://github.com/adhipg)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2013 Adhip Gupta <[http://adhipg.in/](http://adhipg.in/)>
