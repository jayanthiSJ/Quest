import React from 'react';
import {Paper,TextField,RaisedButton} from 'material-ui';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import { Link } from 'react-router-dom';
import $ from 'jquery';
const styles = {

  radioButton: {
    marginBottom: 16,
  }
};
export default class Update_profile extends React.Component
{
constructor()
{
super();
this.state = {emailID : "",Name : "",dob :"", gender : "",country : "", region : "", city : "", postalcode : "",education : "",highschool : "",university : "", phone :""};
this.state = {value: 1};
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
handledofbChange(e)
{
var dob = e.target.value;
this.setState({dob : dob});
}
handleGenderChange(e)
{
var gender = e.target.value;
this.setState({gender : gender});
}

handleChange(event, index, value)
{
  this.setState({value});
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
  <Paper style={styles.paper}>
    <TextField
          hintText="Enter your Email"
          errorText="This field is required"
          floatingLabelText="email"
          onChange={this.handleemailChange.bind(this)}/>

    <br/>
   <TextField
          hintText="Enter your Name"
          errorText="This field is required"
          floatingLabelText="name"
          onChange={this.handlenameChange.bind(this)}/>
    <br/>

    <DatePicker onChange={this.handledofbChange.bind(this)} hintText="Date of Birth" />

    <br/>
      

       <RadioButtonGroup name="shipSpeed" hintText="Gender" defaultSelected="not_light" onChange={this.handleGenderChange.bind(this)}>
       <RadioButton
        value="light"
        label="Male"

        style={styles.radioButton}/>

      <RadioButton
       value="light"
       label="Female"

       style={styles.radioButton}/>


    </RadioButtonGroup>


      <br/>
          <DropDownMenu value={"select"} label="Select Your country" onChange={this.handleCountryChange.bind(this)}>
          <MenuItem value={1} primaryText="America" />
          <MenuItem value={2} primaryText="Australia" />
          <MenuItem value={3} primaryText="Alaska" />
          <MenuItem value={4} primaryText="Pacific Time (US &amp; Canada)" />
          <MenuItem value={5} primaryText="Arizona" />
          <MenuItem value={6} primaryText="Mountain Time" />
          <MenuItem value={7} primaryText="Central Time (US &amp; Canada)" />
          <MenuItem value={8} primaryText="Eastern Time (US &amp; Canada)" />
          <MenuItem value={9} primaryText="Indiana (East)" />
          <MenuItem value={10} primaryText="India" />
          <MenuItem value={11} primaryText="Srilanka" />
           </DropDownMenu>

        <br/>

            <DropDownMenu value={"select"} label="Select Your region" onChange={this.handleRegionChange.bind(this)}>
            <MenuItem value={1} primaryText="Ahmedabad" />
            <MenuItem value={2} primaryText="Bangalore" />
            <MenuItem value={3} primaryText="Chandigarh" />
            <MenuItem value={4} primaryText="Tamil Nadu" />
            <MenuItem value={5} primaryText="Delhi" />
            <MenuItem value={6} primaryText="Gurgaon" />
            <MenuItem value={7} primaryText="CentHyderabad/Secunderabad" />
            <MenuItem value={8} primaryText="Kolkatta" />
            <MenuItem value={9} primaryText="Mumbai" />
            <MenuItem value={10} primaryText="Noida" />
            <MenuItem value={11} primaryText="Pune" />
          </DropDownMenu>

          <br/>

              <DropDownMenu value={"select"} label="Select Your city" onChange={this.handleCityChange}>
              <MenuItem value={1} primaryText="Arakonam" />
              <MenuItem value={2} primaryText="Ariyalur" />
              <MenuItem value={3} primaryText="Chennai" />
              <MenuItem value={4} primaryText="Coimbatore" />
              <MenuItem value={5} primaryText="Dharmapuri" />
              <MenuItem value={6} primaryText="Erode" />
              <MenuItem value={7} primaryText="Kolkatta" />
              <MenuItem value={8} primaryText="Vellore" />
              <MenuItem value={9} primaryText="Salem" />
              <MenuItem value={10} primaryText="Madurai" />
            </DropDownMenu>
            <br/>

            <TextField
               hintText="postalcode"
               errorText="This field is required"
               onChange={this.handlepcodeChange.bind(this)}/>
  </Paper>
);
}

}
