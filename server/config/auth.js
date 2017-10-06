// expose our config directly to our application using module.exports
module.exports = {
  facebook : {
  clientID: '169104700308086',
  clientSecret: '196cd747c8325193791e59ea7773eb22',
  callbackURL: 'http://localhost:3000/users/signupFacebook/callback',
  profileFields: ['id', 'name', 'username', 'email']
}
};
