import React  from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import './reactlandingpage.css';
import Cookies from 'universal-cookie';
const ReactToastr = require('react-toastr');
const {ToastContainer,ToastMessage} = ReactToastr;
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

const cookies = new Cookies();
const styles = {
  submitbtn:{
    width:'50%',
    fontFamily: 'Roboto',
    marginLeft:'25%'
  }
};

var user = cookies.get('displayname');
var token = cookies.get('token');
export default class Postanswer extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        newAnswer:'',
        openEditor: false,
        logStatus:false,
        token:null,
        btnStatus:false
      };

    }

    componentWillMount(){
      this.setState({token:token});
      if(token != null){
        this.setState({btnStatus:true});
      }
    }

    handleClose(){
      this.setState({openEditor: false});
    }

    answerChange(e){
      this.setState({newAnswer:e.target.value});
    }

    openDialog(){
      var that =this;
      that.setState({openEditor:true});
    }
    checkForPostAnswerAlert(){
          this.refs.toasterContainer.info(
            'Signin/SignUp to continue',
          '', {
            timeOut: 3000,
            extendedTimeOut: 3000
              }
        );
    }

    checkForPostAnswerSuccess(){
          this.refs.toasterContainer.success(
            'Posted successfully',
          '', {
            timeOut: 3000,
            extendedTimeOut: 3000
              }
        );
    }

    checkForFillPostAnswerAlert(){
          this.refs.toasterContainer.info(
            'Fillout some Answer',
          '', {
            timeOut: 3000,
            extendedTimeOut: 3000
              }
        );
    }

    postAnswer(){
      var that =this;
      if(that.state.newAnswer == '' ){
        that.checkForFillPostAnswerAlert()
      }
      else{
        var qid = that.props.qid;
        $.ajax({
          type:'POST',
          url:'/answer/'+qid,
          data:{user:cookies.get('emailId'),answer:that.state.newAnswer,time:new Date()},
          success:function(data){
            //alert("Success");
            that.checkForPostAnswerSuccess();
          },
          error:function(err){
              alert(err);
          }
          })
      }
  }


    render(){
      const actions = [
            <FloatingActionButton mini={true} onClick={this.handleClose.bind(this)} style={{align:'center'}}>
              <i className="material-icons">close</i>
            </FloatingActionButton>
          ];
      return(
          <div>
          <ToastContainer ref="toasterContainer"
            toastMessageFactory={ToastMessageFactory}
            className='toast-top-center'/>
            {!(this.state.logStatus)?<div className="text">
              <div className="form-group">
                <label for="exampleTextarea" style={{color:'white'}}>Answer</label>
                <textarea className="form-control" id="exampleTextarea" placeholder="Write your answer here..." rows="6" onChange={this.answerChange.bind(this)}></textarea>
              </div>
              {this.state.token ? <RaisedButton  primary={true} style={styles.submitbtn} disabled={this.state.buttonStatus} onClick={this.postAnswer.bind(this)}>Post your answer</RaisedButton> :  <center><b>Signin/Signup to continue</b></center> }
          </div>:<center><b><div>SignUp/SignIn to continue.....</div></b></center>}  </div>
      )};
    }
