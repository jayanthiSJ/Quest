import React from 'react';
import {Paper,TextField,RaisedButton} from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import $ from 'jquery';
export default class Update_profile extends React.Component
{
constructor()
{
super();
this.state = {emailID : "",Name : "",dob :"", gender : "",country : "", region : "", city : "", postalcode : "",education : "",highschool : "",university : "", phone :""};
}
handleemailChange(e)
{
var emailID = e.target.value;
this.setState({emailID : emailID});
}
handlenameChange(e)
{
var Name = e.target.value;
this.setState({Name : Name});
}
handledofb(e)
{
var dob = e.target.value;
this.setState({dob : dob});
}
handleGenderChange(e)
{
var gender = e.target.value;
this.setState({gender : gender});
}
handleCountryChange(e)
{
var country = e.target.value;
this.setState({country : country});
}
handleRegionChange(e)
{
var region = e.target.value;
this.setState({region : region});
}
handleCityChange(e)
{
var city = e.target.value;
this.setState({city : city});
}
handlepcodeChange(e)
{
var postalcode = e.target.value;
this.setState({postalcode : postalcode});
}
handleeduChange(e)
{
var education = e.target.value;
this.setState({education : education});
}
handlehschoolChange(e)
{
var highschool = e.target.value;
this.setState({highschool : highschool});
}
handleunivChange(e)
{
var university = e.target.value;
this.setState({university : university});
}
handlephnChange(e)
{
var phone = e.target.value;
this.setState({phone : phone});
}
handleupdate()
{
$.ajax({
url :'/users/update_profile',
type : 'POST',
data : {
emailID :this.state.emailID,
Name : this.state.Name,
dob  : this.state.dob,
gender : this.state.gender,
country : this.state.country ,
region : this.state.region,
city :this.state.city,
postalcode : this.state.postalcode,
education : this.state.education,
highschool : this.state.highschool,
university : this.state.university,
phone :this.state.phone
},
success : function(response)
{
alert(JSON.stringify(response));
},
error : function(err)
{
alert("update_failed");
}
})
}
render()
{
return(
<div class="container">
  <h1>Edit Profile
  </h1>
  <hr>
  <div class="row">
    <!-- left column -->
    <div class="col-md-3">
      <div class="text-center">
        <img src="//placehold.it/100" class="avatar img-circle" alt="avatar"/>
        <h6>Upload a different photo...
        </h6>
        <input type="file" class="form-control"/>
      </div>
    </div>
    <!-- edit form column -->
    <div class="col-md-9 personal-info">
      <div class="alert alert-info alert-dismissable">
        <a class="panel-close close" data-dismiss="alert">×
        </a>
        <i class="fa fa-coffee">
        </i>
        This is an
        <strong>.alert
        </strong>. Use this to show important messages to the user.
      </div>
      <h3>Personal info
      </h3>
      <form class="form-horizontal" role="form">
        <div class="form-group">
          <label class="col-lg-3 control-label">Email:
          </label>
          <div class="col-lg-8">
            <input class="form-control" type="text" value="********@gmail.com"  onChange={this.handleemailChange.bind(this)} required/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">Name:
          </label>
          <div class="col-lg-8">
            <input class="form-control" type="text" value="Enter your name"  onChange={this.handlenameChange.bind(this)} required/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label" for="date">DOB
          </label>
          <div class="col-lg-8">
            <input class="form-control" id="date" name="date" placeholder="MM/DD/YYY" type="text" onChange={this.handledofbChange.bind(this)} required/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3" control-label for="radio-inline">Gender
          </label>
          <div class="col-lg-8">
            <input name="gender" id="input-gender-male" value="Male" type="radio" onChange={this.handleGenderChange.bind(this)} required/>Male
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3" control-label for="radio-inline">Gender
          </label>
          <div class="col-lg-8">
            <input name="gender" id="input-gender-female" value="Female" type="radio" onChange={this.handledGenderChange.bind(this)} required/>Female
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">country
          </label>
          <div class="col-lg-8">
            <div class="ui-select">
              <select id="country" class="form-control" onChange={this.handleCountryChange.bind(this)} required/>>
              <option value="America">America
              </option>
              <option value="Australia"> Australia
              </option>
              <option value="Alaska"> Alaska
              </option>
              <option value="Pacific Time (US &amp; Canada)"
                      </option>
              <option value="Arizona"> Arizona
              </option>
              <option value="Mountain Time ">Mountain Time
              </option>
              <option value="Central Time (US &amp; Canada)" selected="selected">
              </option>
              <option value="Eastern Time (US &amp; Canada)">Eastern Time
              </option>
              <option value="Indiana (East)">Indiana (East)
              </option>
              <option value="India"> India
              </option>
              <option value="Srilanka"> Srilanka
              </option>
              </select>
          </div>
        </div>
        </div>
      <div class="form-group">
        <label class="col-lg-3 control-label">region
        </label>
        <div class="col-lg-8">
          <div class="ui-select">
            <select id="region" class="form-control" onChange={this.handleRegionChange.bind(this)} required/>
            <option value="Ahmedabad">Ahmedabad
            </option>
            <option value="Bengaluru">Bangalore
            </option>
            <option value=" Chandigarh">Chandigarh
            </option>
            <option value="Tamil Nadu">Tamil Nadu
            </option>
            <option value=" Delhi">Delhi
            </option>
            <option value=" Gurgaon">Gurgaon
            </option>
            <option value=" Hyderabad/Secunderabad">Hyderabad/Secunderabad
            </option>
            <option value=" Kolkatta">Kolkatta
            </option>
            <option value="Mumbai ">Mumbai
            </option>
            <option value=" Noida">Noida
            </option>
            <option value=" Pune">Pune
            </option>
            </select>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-lg-3 control-label">city
      </label>
      <div class="col-lg-8">
        <div class="ui-select">
          <select id="region" class="form-control" onChange={this.handleCityChange.bind(this)} required/>
          <option value="Arakonam">Ahmedabad
          </option>
          <option value="Ariyalur">Ariyalur
          </option>
          <option value=" Chennai">Chennai
          </option>
          <option value="Coimbatore ">Coimbatore
          </option>
          <option value=" Delhi">Delhi
          </option>
          <option value=" Dharmapuri">Dharmapuri
          </option>
          <option value=" Erode.">Erode.
          </option>
          <option value=" Hyderabad/Secunderabad">Hyderabad/Secunderabad
          </option>
          <option value="Mumbai ">Mumbai
          </option>
          <option value=" Noida">Noida
          </option>
          <option value=" Vellore">Vellore
          </option>
          </select>
      </div>
    </div>
  </div>
    <div class="form-group">
      <label class="col-md-3 control-label">Postal code:
      </label>
      <div class="col-md-8">
        <input type="text" name="pin" pattern="[0-9]{6}" maxlength="6" value="validate" onChange={this.handlepcodeChange.bind(this)} required/ >
      </div>
    </div>
    <div class="form-group">
      <label class="col-lg-3 control-label">Education
      </label>
      <div class="col-lg-8">
        <input class="form-control" type="text" value="  Enter your education details "  onChange={this.handleeduChange.bind(this)} required/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-lg-3 control-label">High school
      </label>
      <div class="col-lg-8">
        <input class="form-control" type="text" value=" Enter your School name"  onChange={this.handlehschoolChange.bind(this)} required/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-lg-3 control-label">university
      </label>
      <div class="col-lg-8">
        <input class="form-control" type="text" value=" Enter your college name"  onChange={this.handleunivChange.bind(this)} required/>
      </div>
    </div>
    <div class="form-group">
      <label class="col-lg-3 control-label" for="phonenum">Phone Number (format: xxxx-xxx-xxxx):
      </label>
      <br/>
      <div class="col-lg-8">
        <input id="phonenum" type="tel" pattern="^\d{4}-\d{3}-\d{4}$" onChange={this.handlephnChange.bind(this)} required/ >
      </div>
    </div>
    <button type="submit" onClick={this.handleupdate.bind(this)}>update_profile</button>
    </button>
  </div>
  );
  }
  }
