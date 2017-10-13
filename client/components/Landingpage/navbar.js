import React from 'react';
import './landingpage.css';
import '../ReactLandingpage/reactlandingpage.css';
//import Defaultimg from './../../images/default_profile.jpg';
import {Link,Redirect} from 'react-router-dom';
import Updateprofile from './../Updateprofile/Updateprofile.js';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IndividualQuestion from '../ReactLandingpage/individualquestion.js';
import AskQuestion from '../ReactLandingpage/texteditor.js';
import Postanswer from '../ReactLandingpage/postAnswer.js';
import Dialog from 'material-ui/Dialog';
import Cookies from 'universal-cookie';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
const cookies = new Cookies();
  var token = cookies.get('token');

class Navbar extends React.Component {

  constructor(props) {
      super(props);
      this.state={
        firstname:'',
        lastname:'',
        username:'',
        password:'',
        searchValue:'',
        logStatus:false,
        logout:false,
        loginStatus:'',
        openAnswer: false,
        answers:'',
        openAskQuestion:false,
        token:null,
        btnStatus:false,
        picture: 'profile.jpg'
      }
      this.getallData = this.getallData.bind(this);
      this.changePicture = this.changePicture.bind(this);
    };

    componentWillMount(){
      this.setState({token:token});
      if(token != null){
        this.setState({btnStatus:true});
      }
    }

    handleClose(){
      this.setState({openAnswer: false,openAskQuestion:false,openprofile: false});
    }

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
    Update()
    {
    this.setState({openprofile: true});
    }
    closeState()
    {
    this.setState({openprofile: false});
    }
    checkForSignupSuccessAlert() {
        this.refs.asd.error(
          'successfuly signed up',
        '', {
          timeOut: 3000,
          extendedTimeOut: 3000
            }
      );
      }
      checkForUserExistAlert() {
          this.refs.asd.error(
            'User exists',
          '', {
            timeOut: 3000,
            extendedTimeOut: 3000
              }
        );
        }
      checkForSignupErrorAlert() {
          this.refs.asd.error(
            'Error while signing up',
          '', {
            timeOut: 3000,
            extendedTimeOut: 3000
              }
        );
        }
  /*ajax call for signup routes*/
    signUp(){
      var that=this;
      $.ajax({
        url:'/users/signup',
        type: 'POST',
        data:{'firstname':this.state.firstname,'lastname':this.state.lastname,'username':this.state.username,'password':this.state.password},
        success: function(response) {
            if(response.status == 'Successfully registered'){
              that.checkForSignupSuccessAlert() ;
            }
            else{
              that.checkForUserExistAlert();
            }
        },
        error: function(err) {
            that.checkForSignupErrorAlert();
        }
      })
    }


  /*ajax call for signupFacebook routes*/
    // signUpFacebook(){
    //   $.ajax({
    //     url:'/users/signupFacebook',
    //     type: 'POST',
    //     success: function(response) {
    //         if(response.status == 'signup success'){
    //           alert("Successfully registered!!!Please login to visit the site")
    //         }
    //         else{
    //           alert("User already exists!!!");
    //         }
    //     },
    //     error: function(err) {
    //         alert("Registration failed!!Try again....");
    //     }
    //   })
    // }
    checkForInvalidCredentialsAlert() {
        this.refs.asd.error(
          'Provise valid credentials',
        '', {
          timeOut: 3000,
          extendedTimeOut: 3000
            }
      );
      }
      checkForUserAlert() {
          this.refs.asd.error(
            'User doesnt exists...Please signup',
          '', {
            timeOut: 3000,
            extendedTimeOut: 3000
              }
        );
        }
        checkForSuccessfullyLoggedAlert() {
            this.refs.asd.success(
              'Successfully logged!!!',
            '', {
              timeOut: 3000,
              extendedTimeOut: 3000
                }
          );
          }
          checkForFailedLoggedAlert() {
              this.refs.asd.error(
                ' login Failed!!!',
              '', {
                timeOut: 3000,
                extendedTimeOut: 3000
                  }
            );
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
                  that.checkForInvalidCredentialsAlert();
            }
            else if(response == 'No user'){
              that.checkForUserAlert();
            }
            else{
              that.setState({logStatus:true});
              //console.log(response.user.firstname);
              var displayname = response.user.firstname+" "+response.user.lastname;
              var emailId = that.state.username;
              var token = response.token;
              cookies.set('displayname', displayname);
                  cookies.set('emailId',emailId);
              cookies.set('token',token);
              //localStorage.setItem('token',token);
              that.checkForSuccessfullyLoggedAlert();
              that.getallData();
            }
        },
        error: function(err) {
              that.checkForFailedLoggedAlert();
        }
      })
    }
    checkForFailedSearchAlert() {
        this.refs.asd.error(
          ' Search failed!!Try again...',
        '', {
          timeOut: 3000,
          extendedTimeOut: 3000
            }
      );
      }

      checkForAskQuestionAlert(){
            this.refs.asd.info(
              'Signin/SignUp to continue',
            '', {
              timeOut: 2000,
              extendedTimeOut: 2000
                }
          );
      }

      checkForEmptyValues(){
            this.refs.asd.info(
              'Enter your question to search',
            '', {
              timeOut: 3000,
              extendedTimeOut: 3000
                }
          );
      }
      checkForNoAnswerForQuestionValues(){
            this.refs.asd.error(
              'No answer for this question,Signin/SignUp to post answer',
            '', {
              timeOut: 2000,
              extendedTimeOut: 2000
                }
          );
      }


    search(){
      var that = this;
      if(that.state.searchValue == '' ){
        that.checkForEmptyValues();
        //alert("Enter the question");
      }
      else{
      $.ajax({
        url:'/search',
        type: 'POST',
        data:{searchValue:that.state.searchValue},
        success: function(answers) {
          var answers;
          if(answers == 'No answers!!!!!'){
            if(that.state.token){
              console.log("----------"+token);
              that.setState({openAnswer:true});
              //var qid=this.props.questionId
              answers = <Postanswer qid={qid}/>
            }
            else{
              that.checkForNoAnswerForQuestionValues();
            }
          }
          else{
            that.setState({openAnswer:true});
            answers = answers.map((row,index)=> {
             return <IndividualQuestion answer={row.answer} answered_by={row.answered_by} likes={row.likes} dislikes={row.dislikes} timestamp={row.time}  key = {index}/>
           });
         }
         that.setState({answers : answers});
        },
        error: function(err) {
          //alert("Signin/SignUp to continue");
          that.checkForFailedSearchAlert();
        }
      })
    }
    }

    askQuestion(){
      console.log(token);
        if(this.state.token)
        {
          this.setState({openAskQuestion:true})
        }
        else {
          this.checkForAskQuestionAlert();
        }
    }
    checkForFailedLogout() {
        this.refs.asd.error(
          ' logoutFailed..',
        '', {
          timeOut: 3000,
          extendedTimeOut: 3000
            }
      );
      }
    logout(){
            var that=this;
              $.ajax({
                   url:'/users/logOut',
                   type:'GET',
                   success:function(data){
                       that.setState({logStatus:false,logout:true});
                       cookies.remove('displayname');
                       cookies.remove('emailId');
                       cookies.remove('token');
                       //localStorage.removeItem('token');
                       location.reload();
                   },
                   error:function(err){
                    that.checkForFailedLogout();
                   }
              });
    }
    getallData() {
    let context = this;
   //console.log(this.state.username);
   //alert("getalldate");
      $.ajax({
          url:'/view',
          type:'POST',
          data:{name: cookies.get('emailId')},
          datatype:'json',
          success:function(data){
           //alert(JSON.stringify(data));
           if(data[0].picture == '' ){
             context.setState({picture:'profile.jpg'});
           }
           else{
             //console.log(data[0].picture+'my image');
             context.setState({picture:data[0].picture});
           }
              },
              error: function(err){
     }});
  }
  changePicture(picture) {
      this.setState({
        picture: picture
      })
    }

render(){
  const actions = [
        <FloatingActionButton mini={true} onClick={this.handleClose.bind(this)} style={{align:'center'}}>
          <i className="material-icons">close</i>
        </FloatingActionButton>
      ];
  return(

<div className="row ">
  <ToastContainer ref='asd'
    toastMessageFactory={ToastMessageFactory}
    className='toast-top-center'/>
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
                <p className="qaimage">Quest</p>
             </div>

              <div id="navbar" className="navbar-collapse collapse ">
               <div className=" col-sm-8 col-md-4 ">

               <div className="input-group " style={{marginTop:'4%',marginLeft:'15%'}}>
                   <input type="text" className="form-control search" placeholder="Search your question"  onChange={this.changeSearchValue.bind(this)}/>
                   <div className="input-group-btn">
                       <button className="btn btn-default searchBtn"  onClick={this.search.bind(this)}><i className="glyphicon glyphicon-search"></i>
                       <Dialog
                           modal={false}
                           open={this.state.openAnswer}
                           autoDetectWindowHeight={true}
                           autoScrollBodyContent={true}
                           repositionOnUpdate={true}
                           onRequestClose={this.handleClose.bind(this)}
                         >
                           <FloatingActionButton mini={true} onClick={this.handleClose.bind(this)} style={{float:'right',marginRight:'0%',marginTop:'0%'}}>
                             <i className="material-icons">close</i>
                           </FloatingActionButton>
                           <h1><center><b><p className="individualquestion">{this.state.searchValue}?</p></b></center></h1>
                           {this.state.answers}
                         </Dialog>
                       </button>
                   </div>
               </div>

               </div>



               <div className=" col-sm-8 col-md-2 askbtn ">
                 <button type="button" className=" btn btn-round-lg btn-sm  btnColor" onClick={this.askQuestion.bind(this)}>Ask Question <i className="fa fa-question" aria-hidden="true"></i>
                   <Dialog
                       modal={false}
                       open={this.state.openAskQuestion}
                       autoDetectWindowHeight={true}
                       autoScrollBodyContent={true}
                       repositionOnUpdate={true}
                       onRequestClose={this.handleClose.bind(this)}
                     >
                       <FloatingActionButton mini={true} onClick={this.handleClose.bind(this)} style={{float:'right',marginRight:'0%',marginTop:'0%'}}>
                         <i className="material-icons">close</i>
                       </FloatingActionButton>
                       <AskQuestion/>
                     </Dialog>
                 </button>
                 <i class="fa fa-question" aria-hidden="true"></i>
               </div>

               {this.state.logStatus?<ul className="nav navbar-nav navbar-right profileImg">
                       <li className='username'><p><b><i>{cookies.get('displayname')}</i></b></p></li>
                       <li className="dropdown">
                         <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                         <img className="inset" src={"../../images/"+this.state.picture}/>
                          </a>
                         <ul className="dropdown-menu" role="menu">
                           <li><a data-toggle="modal" data-target="#profile" onClick={this.Update.bind(this)}><i className="fa fa-user"></i> Profile</a></li>
                           <Dialog
                              actions={actions}
                              modal={false}
                              open={this.state.openprofile}
                              autoDetectWindowHeight={true}
                             autoScrollBodyContent={true}
                             repositionOnUpdate={true}
                              onRequestClose={this.handleClose.bind(this)}
                            >
                             <Updateprofile picture={this.state.picture} changePicture={this.changePicture}/>
                            </Dialog>
                           <li className="divider"></li>
                           <li><a href="#" onClick={this.logout.bind(this)}><span className="fa fa-power-off" ></span> Log Out</a></li>
                           {this.state.logStatus}
                         </ul>
                       </li>
                     </ul>:<ul className="nav navbar-nav navbar-right bdr">
                              <li><a href="#"className="sign" data-toggle="modal" data-target="#at-login">Sign in</a></li>
                              </ul>}
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
                <h2 style={{marginLeft:'80px',marginBottom:'50px',fontFamily:'Roboto'}}> Welcome to Login Page</h2>
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
                      <p className="ta-l">Dont have an account ? </p>
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

                <button type="submit" className="btn-lgin" data-toggle="modal"  data-dismiss="modal" data-target="#at-signup-filling" >Signup with EmailID</button>
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
