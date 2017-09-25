var mongoose = require('mongoose');

/*schema for signup database*/
module.exports = mongoose.model('userProfile', {
    emailId:
    {
        type: String,
        required: true
    },
    profile:
    {
      name: {
        type: String,
        default: 'name'
      },
      picture:
      {
        type: String,
        default:
        'https://image.freepik.com/free-icon/user-verification-symbol-for-interface_318-63525.jpg'
      },

      dob:
      {
        type: String,
        default: 'dob'
      },
      gender:
      {
        type: String,
        default: 'gender'
      },

        country:
         {
          type: String,
          default: 'Country'
        },
        region:
        {
          type: String,
          default: 'State'
        },
        city:
        {
          type: String,
          default: 'City'
        },
        postalCode:
        {
          type: String,
          default: 'postal Code'
        }
        },
      education:
      {
        primary:
        {
          type: String,
          default: 'Primary'
        },
        highSchool:
        {
          type: String,
          default: 'Secondary'
        },
        university:
        {
          type: String,
          default: 'University'
        }
      },
      phone:
       {
        type: String,
        default: 'Phone'
      }
    });
