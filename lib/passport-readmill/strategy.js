/**
 * Module dependencies.
 */
var util = require('util')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
  , InternalOAuthError = require('passport-oauth').InternalOAuthError;


function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || "https://readmill.com/oauth/authorize";
  options.tokenURL = options.tokenURL || 'https://readmill.com/oauth/token';

  OAuth2Strategy.call(this, options, verify);
  this.name = 'readmill';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 * Retrieve user profile from Readmill
 *
 * This function constructs a normalized profile with the following properties:
 *
 *   - `provider`     set to `readmill`
 *   - `id`           the user's Readmill ID
 *   - `username`     the user's Readmill username
 *   - `displayname`  the user's full name
 *   - `name`         the user's first name and last name
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get("https://api.readmill.com/v2/me", accessToken, function(err, body, res) {
    if(err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }

    try {
      var json = JSON.parse(body);

      var profile = { provider: 'readmill' };
      profile.id = json.user.id;
      profile.displayName = json.user.fullname;
      profile.name = {
        familyName: json.user.firstname,
        givenName: json.user.firstname
      };
      profile.username = json.user.username;

      profile._raw = body;
      profile._json = json;

      done(null, profile);
    } catch(e) {
      done(e);
    }
  });
}


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
