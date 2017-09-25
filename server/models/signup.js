var mongoose = require('mongoose');

/*schema for signup database*/
module.exports = mongoose.model('user', {
    firstname:{type : String},
    lastname:{type : String},
    password: {type : String,required: true},
    email:  {type : String,required: true,unique : true}
});
