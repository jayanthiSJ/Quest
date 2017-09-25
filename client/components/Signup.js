import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import $ from 'jquery';

const styles={
  submitbtn:{
    width:'50%',
    marginLeft:'25%',
    marginTop:'5%'
  }
}

class Signup extends React.Component {

  constructor(props) {
      super(props);
      this.state={
        firstname:'',
        lastname:'',
        email:'',
        password:''
      }
    }

    changeFirstname(e){
      this.setState({firstname:e.target.value});
    }
    changeLastname(e){
      this.setState({lastname:e.target.value});
    }
    changeEmail(e){
      this.setState({email:e.target.value});
    }
    changePassword(e){
      this.setState({password:e.target.value});
    }
    signUp(){
      $.ajax({
        url:'/users/signup',
        type: 'POST',
        data:{'firstname':this.state.firstname,'lastname':this.state.lastname,'email':this.state.email,'password':this.state.password},
        success: function(response) {
            alert("success");
        },
        error: function(err) {
            alert("error in creation");
        }
      })
    }
    render() {
        return (
          <div >
            <Paper  zDepth={5} >
            <TextField
              hintText="Firstname"
              floatingLabelText="Firstname" onChange={this.changeFirstname.bind(this)}/><br />
              <TextField
                hintText="Lastname"
                floatingLabelText="Lastname" onChange={this.changeLastname.bind(this)}/><br />
                <TextField
                  hintText="Email"
                  floatingLabelText="Email" onChange={this.changeEmail.bind(this)}/><br />
                  <TextField
                    hintText="Password"
                    floatingLabelText="Password" onChange={this.changePassword.bind(this)}/><br />
                     <RaisedButton label="Primary" primary={true} onClick={this.signUp.bind(this)}/>
            </Paper>
          </div>
        );
    }
}

export default Signup;
