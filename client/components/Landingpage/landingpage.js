import React from 'react';
import {Card, CardActions, CardTitle, CardText,CardMedia,CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {Link,Redirect} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import {indigo200,blue200,lightBlue200,cyan200,lightBlue400,blue400,tealA200} from 'material-ui/styles/colors.js';
import RaisedButton from 'material-ui/RaisedButton';
import Reactimg from './../../images/react2.jpg';
import Nodeimg from './../../images/node1.jpg';
import Mongoimg from './../../images/mongodb.jpg';
import Expressimg from './../../images/express.jpg';
import Neo4jimg from './../../images/neo4j.jpg';
import Angularimg from './../../images/angular.jpg';
import './landingpage.css';

const styles = {
  frontcardtitle:{
    fontSize:'25%',
    fontWeight:'bold'
  },
  frontcard: {
    width: '70%',
    height: '70%',
    textAlign: 'center',
    padding: '20px',
    borderTopLeftRadius:'30%',
    borderBottomRightRadius:'30%'
  },
  frontcardmedia:{
    width:'60%',
    height:'90%',
    paddingTop: '20%',
    textAlign:'center',
    marginLeft:'20%'
  },
  backcardtitle:{
    fontSize:'20%',
    fontWeight:'bold'
  },
  raisedbtn:{
    width:'40%',
    height:'20%',
    fontSize:'30%',
    color:'white'
  },
  backcardheader:{
    fontSize:'155%',
    fontWeight:'bold',
    marginTop:'8%',
  },
  avatar:{
    width:'25%',
    height:'25%',
    marginTop:'-15%',
    //border:'5px solid transparent',
    borderColor:'white'
  },
  recentquestion:{
    marginTop:'-20%'
  },
  timestamp:{
    textDecorationLine: 'none',
    marginTop:'-8%'
  },
  backtable:{
    marginBottom:'0%',
    height:'2%'
  }
};


class Landingpage extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname:'',
      lastname:'',
      email:'',
      password:'',


      loginStatus:false,
      recentlyaskedReact:'What is React JS?',
      timestampReact:'yesterday',
      questionReact:'800',
      answerReact:'700',
      colorReact : indigo200,
      recentlyaskedMongo:'What is MongoDB?',
      timestampMongo:'2 days ago',
      questionMongo:'5k',
      answerMongo:'4k',
      colorMongo : blue200,
      recentlyaskedNode:'What is Node JS?',
      timestampNode:'1 week ago',
      questionNode:'3k',
      answerNode:'2.5k',
      colorNode : lightBlue200,
      recentlyaskedExpress:'What is Express JS?',
      timestampExpress:'today',
      questionExpress:'1k',
      answerExpress:'500',
      colorExpress : cyan200,
      recentlyaskedAngular:'What is Angular JS?',
      timestampAngular:'1 month ago',
      questionAngular:'6k',
      answerAngular:'5.5k',
      colorAngular : lightBlue400,
      recentlyaskedNeo4j:'Define neo4j.',
      timestampNeo4j:'today',
      questionNeo4j:'8k',
      answerNeo4j:'7k',
      colorNeo4j : tealA200,
    }
  };

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
      data:{'firstname':this.state.firstname/*'lastname':this.state.lastnam*/,'email':this.state.email,'password':this.state.password},
      success: function(response) {
          alert("success");
      },
      error: function(err) {
          alert("error in creation");
      }
    })
  }


  login(){
    console.log("EMAIL: "+this.state.email+"password: "+this.state.password);
    $.ajax({
      url:'/users/login',
      type: 'POST',
      data:{'email':this.state.email,'password':this.state.password},
      success: function(response) {
          alert("success");

      },
      error: function(err) {
          alert("error in creation");
      }
    })
  }
  logged(){

  };
  recetlyaskedQuestion(){
    this.setState({loginStatus:true});
  };


  render(){
    const cardData = [
      {
        img: Reactimg,
        title: "React JS",
        recentlyasked:this.state.recentlyaskedReact,
        timestamp:this.state.timestampReact,
        question:this.state.questionReact,
        answer:this.state.answerReact,
        color:this.state.colorReact
      },
      {
        img: Mongoimg,
        title: "MongoDB",
        recentlyasked:this.state.recentlyaskedMongo,
        timestamp:this.state.timestampMongo,
        question:this.state.questionMongo,
        answer:this.state.answerMongo,
        color:this.state.colorMongo
      },
      {
        img: Nodeimg,
        title: "Node JS",
        recentlyasked:this.state.recentlyaskedNode,
        timestamp:this.state.timestampNode,
        question:this.state.questionNode,
        answer:this.state.answerNode,
        color:this.state.colorNode
      },
      {
        img: Expressimg,
        title: "Express JS",
        recentlyasked:this.state.recentlyaskedExpress,
        timestamp:this.state.timestampExpress,
        question:this.state.questionExpress,
        answer:this.state.answerExpress,
        color:this.state.colorExpress
      },
      {
        img: Angularimg,
        title: "Angular JS",
        recentlyasked:this.state.recentlyaskedAngular,
        timestamp:this.state.timestampAngular,
        question:this.state.questionAngular,
        answer:this.state.answerAngular,
        color:this.state.colorAngular
      },
      {
        img: Neo4jimg,
        title: "Neo4j",
        recentlyasked:this.state.recentlyaskedNeo4j,
        timestamp:this.state.timestampNeo4j,
        question:this.state.questionNeo4j,
        answer:this.state.answerNeo4j,
        color:this.state.colorNeo4j
      }
    ];
    if(this.state.loginStatus){
        return(
        <Redirect to='/individualquestion'/>
        );
    }
  return(
    <div className="container-fluid ">
   <div className="row">
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
                  <div id="navbar" className="navbar-collapse collapse">
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
         <div className="modal fade" id="at-login" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
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
                        <div className="form-group">
                           <input type="email" className="form-control-form " id="exampleInputEmaillog" placeholder="Email" onChange={this.changeEmail.bind(this)}/>
                        </div>
                        <div className="form-group">
                           <input type="password" className="form-control-form " id="exampleInputPasswordpas" placeholder="Password" onChange={this.changePassword.bind(this)}/>
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
         <div className="modal fade" id="at-signup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                  </div>
                  <div className="modal-body">
                     <button className="btn-fb"> <i className="fa fa-fw fa-facebook pull-left" aria-hidden="true"></i>
                     Signup with Facebook	</button> <br/>
                     <button className="btn-gp"> <i className="fa fa-fw fa-google-plus pull-left" aria-hidden="true"></i>
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
         <div className="modal fade" id="at-signup-filling" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
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
                     <form>
                        <div className="form-group">
                           <input type="text" className="form-control-form " id="exampleInputEmaillog" placeholder="First Name" onChange={this.changeFirstname.bind(this)}/>
                        </div>
                        <div className="form-group">
                           <input type="text" className="form-control-form " id="exampleInputEmaillog" placeholder="Last Name" onChange={this.changeLastname.bind(this)}/>
                        </div>
                        <div className="form-group">
                           <input type="email" className="form-control-form " id="exampleInputEmaillog" placeholder="Email" onChange={this.changeEmail.bind(this)}/>
                        </div>
                        <div className="form-group">
                           <input type="password" className="form-control-form " id="exampleInputPasswordpas" placeholder="Password" onChange={this.changePassword.bind(this)}/>
                        </div>
                        <button type="submit" className="btn-lgin" onClick={this.signUp.bind(this)}>Signup</button>
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
         <div className="modal fade" id="at-reset-pswd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
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
         <div className="modal fade" id="at-helping" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
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
   <hr/>
   <div className="bg-image container-fluid">
      <div className="row cards">
         {cardData.map((data) => (
         <div className="col-sm-4 domain">
            <div className="flip-container" >
               <div className="flipper">
                  <div className="front">
                     <Card style={styles.frontcard}>
                        <CardText style={styles.frontcardtitle}>{data.title}</CardText>
                        <CardMedia style={styles.frontcardmedia}>
                           <img className="reactimg" src={data.img} alt="" />
                        </CardMedia>
                     </Card>
                  </div>
                  <div className="back">
                     <Card style={{backgroundColor:data.color,width: '80%',height: '80%',textAlign: 'center',margin:'2%',borderBottomLeftRadius:'20%',borderTopRightRadius:'20%'}}>
                        <CardHeader
                           avatar={<Avatar style={styles.avatar} src={data.img}/>}
                           title={<CardText style={styles.backcardheader}>{data.title}</CardText>}
                           />
                        <CardActions style={styles.recentquestion}>
                          {<CardText style={styles.backcardtitle} >
                             React is a declarative, efficient, and flexible JavaScript library for building user interfaces.</CardText>}
                        </CardActions>
                        <Link to="/home"><RaisedButton  style={styles.raisedbtn} secondary={true} >Visit site</RaisedButton></Link>
                     </Card>
                  </div>
               </div>
            </div>
         </div>
         ))}

      </div>
   </div>
   <div className="copyright">
      <p>
         <b>
            <i>
      <center>Copyright © 2017. All Rights Reserved.</center></i></b></p>
   </div>
</div>
)};
};

export default Landingpage;
