// expose our config directly to our application using module.exports
module.exports = {
    FACEBOOK: {
        // your App ID
        clientID: '169104700308086',
        // your App Secret
        clientSecret: '196cd747c8325193791e59ea7773eb22',
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'profileUrl', 'email']
    }
};
