import React from 'react';
import './landingpage.css';
import Defaultimg from './../../images/default_profile.jpg';
import Logo from './../../images/QandA.jpg';
import {Link,Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Navbar extends React.Component {

  constructor(props) {
      super(props);
      this.state={
        firstname:'',
        lastname:'',
        username:'',
        password:'',
        searchValue:'',
        logStatus:false
      }
    };



    changeFirstname(e){
      this.setState({firstname:e.target.value});
    }
    changeLastname(e){
       this.setState({lastname:e.target.value});
     }
    changeEmail(e){
      this.setState({username:e.target.value});
    }
    changePassword(e){
      this.setState({password:e.target.value});
    }

    changeSearchValue(e){
      this.setState({searchValue:e.target.value});
    }

  /*ajax call for signup routes*/
    signUp(){
      $.ajax({
        url:'/users/signup',
        type: 'POST',
        data:{'firstname':this.state.firstname,'lastname':this.state.lastname,'username':this.state.username,'password':this.state.password},
        success: function(response) {
            if(response.status == 'Successfully registered'){
              alert("Successfully registered!!!Please login to visit the site")
            }
            else{
              alert("User already exists!!!");
            }
        },
        error: function(err) {
          alert(JSON.stringify(err));
            alert("Registration failed!!Try again....");
        }
      })
    }


  /*ajax call for signupFacebook routes*/
    signUpFacebook(){
      $.ajax({
        url:'/users/signupFacebook',
        type: 'POST',
        success: function(response) {
            alert(response);
            if(response.status == 'signup success'){
              alert("Successfully registered!!!Please login to visit the site")
            }
            else{
              alert("User already exists!!!");
            }
        },
        error: function(err) {
            alert("Registration failed!!Try again....");
        }
      })
    }

  /*ajax call for login routes*/
    login(){
      var that = this;
      $.ajax({
        url:'/users/login',
        type: 'POST',
        data:{'username':that.state.username,'password':that.state.password},
        success: function(response) {
            if(response == 'Invalid credentials'){
              alert("Provide valid credentials....");
            }
            else if(response == 'No user'){
              alert("User doesnt exists...Please signup");
            }
            else{
              that.setState({loginStatus:true});
              var displayname = response.firstname+" "+response.lastname;
              cookies.set('displayname', displayname, { path: '/' });
              console.log(cookies.get(displayname));
              alert("Successfully logged!!!")
            }
        },
        error: function(err) {
            alert("Login failed!!Try again....");
        }
      })
    }

    search(){
      var search = this;
      console.log("search:"+search.state.searchValue);
      $.ajax({
        url:'/search',
        type: 'POST',
        data:{searchValue:search.state.searchValue},
        success: function(response) {
            alert("success:"+JSON.stringify(response));
        },
        error: function(err) {
            console.log(err);
            alert(err);
            console.log(JSON.stringify(err));
            //alert("Search failed!!Try again....");
        }
      })
    }


render(){
  return(
<div className="row ">
 <div className="col-xs-6 col-md-12">
    <header className="header-tp">
       <nav className="navbar navbar-default navbar-static-top">
          <div className="container-fluid">
             <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                </button>
                <img className="qaimage" src="../../images/QandA.jpg"/>
             </div>

              <div id="navbar" className="navbar-collapse collapse ">
               <div className=" col-sm-8 col-md-6 ">

                   <div className="input-group">
                       <input type="text" className="form-control" placeholder="Search"  onChange={this.changeSearchValue.bind(this)}/>
                       <div className="input-group-btn">
                           <button className="btn btn-default"  onClick={this.search.bind(this)}><i className="glyphicon glyphicon-search"></i></button>
                       </div>
                   </div>

               </div>

                <ul className="nav navbar-nav navbar-right bdr">
                   <li><a href="#" data-toggle="modal" data-target="#at-login">Sign in</a></li>
                </ul>
             </div>
          </div>
       </nav>
    </header>
 </div>
 <section className="at-login-form">
    {/*MODAL LOGIN*/}
    <div className="modal fade" id="at-login" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
       <div className="modal-dialog" role="document">
          <div className="modal-content">
             <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
             </div>
             <div className="modal-body">
                <button className="btn-fb"> <i className="fa fa-fw fa-facebook pull-left" aria-hidden="true"></i>
                Login with Facebook	</button> <br/>
                <button className="btn-gp"> <i className="fa fa-fw fa-google-plus pull-left" aria-hidden="true"></i>
                Login with Google	</button> <br/>
                <div className="signup-or-separator">
                   <span className="h6 signup-or-separator--text">or</span>
                   <hr/>
                </div>
                <form>
                   <div >
                      <input type="email" className="form-control-form " id="exampleInputEmaillog" placeholder="Email" required onChange={this.changeEmail.bind(this)}/>
                   </div>
                   <div >
                      <input type="password" className="form-control-form " id="exampleInputPasswordpas" placeholder="Password" required onChange={this.changePassword.bind(this)}/>
                   </div>
                   <button type="submit" className="btn-lgin" onClick={this.login.bind(this)}>Login</button>
                </form>
             </div>
             <div className="modal-footer">
                <div className="row">
                   <div className="col-md-6">
                      <p className="ta-l">Don't have an account ? </p>
                   </div>
                   <div className="col-md-4 col-md-offset-2">
                      <button className="btn-gst"  data-toggle="modal"  data-dismiss="modal" data-target="#at-signup" >Sign Up </button>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    {/*MODAL LOGIN ENDS*/}
    {/*MODAL SIGNUP*/}
    <div className="modal fade" id="at-signup" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
       <div className="modal-dialog" role="document">
          <div className="modal-content">
             <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
             </div>
             <div className="modal-body">
                <button className="btn-fb"> <i className="fa fa-fw fa-facebook pull-left" aria-hidden="true"></i>
                Signup with Facebook	</button> <br/>
                <button className="btn-gp" onClick={this.signUpFacebook.bind(this)}> <i className="fa fa-fw fa-google-plus pull-left" aria-hidden="true"></i>
                Signup with Google	</button> <br/>
                <div className="signup-or-separator">
                   <span className="h6 signup-or-separator--text">or</span>
                   <hr/>
                </div>
                <button type="submit" className="btn-lgin" data-toggle="modal"  data-dismiss="modal" data-target="#at-signup-filling" >Signup with Email</button>
             </div>
             <div className="modal-footer">
                <div className="row">
                   <div className="col-md-6">
                      <p className="ta-l">Already a Member? </p>
                   </div>
                   <div className="col-md-4 col-md-offset-2">
                      <button className="btn-gst"  data-toggle="modal"  data-dismiss="modal" data-target="#at-login">Login</button>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    {/*MODAL SIGNUP FORM FILLING*/}
    <div className="modal fade" id="at-signup-filling" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
       <div className="modal-dialog" role="document">
          <div className="modal-content">
             <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
             </div>
             <div className="modal-body">
                <p>Sign up with <a href="#">Facebook</a>  or <a href="#">Google</a></p>
                <div className="signup-or-separator">
                   <span className="h6 signup-or-separator--text">or</span>
                   <hr/>
                </div>
                <form onSubmit={this.signUp.bind(this)}>
                   <div className="form-group">
                      <input type="text" className="form-control-form " id="exampleInputEmaillog" placeholder="First Name" onChange={this.changeFirstname.bind(this)} required/>
                   </div>
                   <div className="form-group">
                      <input type="text" className="form-control-form " id="exampleInputEmaillog" placeholder="Last Name" onChange={this.changeLastname.bind(this)} required/>
                   </div>
                   <div className="form-group">
                      <input type="email" className="form-control-form " id="exampleInputEmaillog" placeholder="Email" onChange={this.changeEmail.bind(this)} required/>
                   </div>
                   <div className="form-group">
                      <input type="password" className="form-control-form " id="exampleInputPasswordpas" placeholder="Password" onChange={this.changePassword.bind(this)} required/>
                   </div>
                   <button type="submit" className="btn-lgin" >Signup</button>
                </form>
             </div>
             <div className="modal-footer">
                <div className="row">
                   <div className="col-md-6">
                      <p className="ta-l">Already a Member? </p>
                   </div>
                   <div className="col-md-4 col-md-offset-2">
                      <button className="btn-gst"  data-toggle="modal"  data-dismiss="modal" data-target="#at-login">Login</button>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    {/*MODAL SIGNUP FORM FILLING*/}
    {/*MODAL FORGOT PASSWORD*/}
    <div className="modal fade" id="at-reset-pswd" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
       <div className="modal-dialog" role="document">
          <div className="modal-content">
             <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
             </div>
             <div className="modal-body">
                <form>
                   <p>	Enter the email address associated with your account, and we’ll email you a link to reset your password. </p>
                   <div className="form-group">
                      <input type="email" className="form-control-form " id="exampleInputEmaillog" placeholder="Email"/>
                   </div>
                </form>
             </div>
             <div className="modal-footer">
             </div>
          </div>
       </div>
    </div>
    {/*MODAL HELP*/}
    <div className="modal fade" id="at-helping" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
       <div className="modal-dialog" role="document">
          <div className="modal-content">
             <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
             </div>
             <div className="modal-body">
                <form>
                   <div className="form-group">
                      <input type="text" className="form-control-form " id="exampleInputEmaillog" placeholder="Enter Your Searches "/>
                   </div>
                </form>
             </div>
             <div className="modal-footer">
                <div className="row">
                   <button className="btn-gst"  data-toggle="modal"  data-dismiss="modal" >Send areset Link</button>
                </div>
             </div>
          </div>
       </div>
    </div>
 </section>
</div>
)};
};
export default Navbar;
