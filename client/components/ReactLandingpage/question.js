import React  from 'react';
import Moment from 'react-moment';
import {Link,Redirect} from 'react-router-dom';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import {Row,Col} from 'react-flexbox-grid';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
// import Tooltip from 'material-ui/Tooltip';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import {grey900,indigo900,tealA700,blue300,cyan500,grey50} from 'material-ui/styles/colors.js';
import IndividualQuestion from './individualquestion.js';
import Postanswer from './postAnswer.js';
import './reactlandingpage.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const styles = {
  col1:{
    textAlign: 'center',
    whiteSpace:'inherit',
    fontFamily: 'Roboto !important',
    fontSize:'120%',
    color:'grey',
  },
  col2:{
    textAlign: 'center',
    whiteSpace:'inherit',
    fontFamily: 'Roboto',
    fontSize:'120%',
    color:'grey'
  },
  col3:{
    whiteSpace:'inherit',
    fontFamily: 'Roboto',
    fontSize:'110%',
    textAlign:'right',
    color:'grey'
  },
  followBtn:{
    marginLeft:'10%',
    backgroundColor:tealA700,
    color:'grey'
  },
  submitbtn:{
    width:'50%',
    fontFamily: 'Roboto',
    marginLeft:'25%'
  },
  paper:{
    width:'80%',
    marginLeft:'10%',
    marginTop:'2%',
    marginBottom:'2%',
    marginRight:'10%'
  },
  badge:{
    marginTop:'5%',
    padding: '14px 14px 4px 4px'
  }
};

var user = cookies.get('displayname');
export default class Question extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        follower:'followers',
        answer:'answers',
        answers:'',
        answers1:'',
        dialog:'',
        openAnswer: false,
        buttonStatus:true,
        displayAnswerCount:true,
        postButton:false,
        followBtn:true,
        button:false,followups:this.props.followCount,
        displayAnswer:false,
        user:null,
        firstletter:''
      };

    }
    componentWillMount(){
    if((this.props.followCount)<=1){
      this.setState({follower:'follower'});
    }
    if((this.props.answerCount)<=1){
      this.setState({answer:'answer'});
    }

    else{
      this.setState({followups:this.props.followCount});
    }


    if(this.props.name == "unanswered"){
      this.setState({displayAnswerCount:false});
    }

    var user = cookies.get('emailId');
    this.setState({user:user})
    if(user == null){
      this.setState({button:false});
    }
    else{
      this.setState({button:true});
    }

    var avatar = this.props.postedBy;
    var image = avatar.substring(0,1);
    this.setState({firstletter:image});

    var that = this;
    $.ajax({
      type:'GET',
      url:'/followStatus',
      data:{user:user},
      success:function(data){
        console.log(data);
        data.map((row,index)=>{
            if(row.qid == that.props.qid){
              that.setState({followBtn:false});
            }
            else{
              that.setState({followBtn:true});
            }
          });
      },
      error:function(err){
        alert("error");
      }
    })

  }

  postAnswer(){
    var qid = this.props.qid;
    var answers = <Postanswer qid={qid}/>
    this.setState({postButton:false});
    this.setState({answers : answers});
  }

  fetchAnswer(){
    var that =this;
    that.setState({openAnswer:true});
    var qid = this.props.qid;
    $.ajax({
    url:'/answer/'+qid,
    type:'GET',
    data:{},
    success:function(answers){
          var answers;
          var answers1;
          if(answers == 'No answers!!!!!'){
            answers = <Postanswer qid={qid}/>
            that.setState({postButton:false});
          }
          else{
            that.setState({postButton:true,displayAnswer:true});
            answers = answers.map((row,index)=> {
             return <IndividualQuestion answer={row.answer} answered_by={row.answered_by} likes={row.likes} dislikes={row.dislikes} answerid={row.answerId} timestamp={row.time} key = {index}/>
           });
         }
         that.setState({answers : answers});
    },
    error:function(err){
        alert(JSON.stringify(err));
    }
    })
  }

  handleClose(){
    this.setState({openAnswer: false});
  }

  followQuestion(){
    var that = this;
    var qid = this.props.qid;
    var followup=that.props.followCount;
    $.ajax({
      type:'POST',
      url:'/followQuestion/'+qid,
      data:{user:cookies.get('emailId')},
      success:function(data){
          that.setState({followBtn:false,followups:that.props.followCount});
          alert("follow success");
      },
      error:function(err){
          alert(err);
      }
      })
  }
  checkForSuccessAlert() {
    this.refs.asd.success(
      'success message alert',
    '', {
      timeOut: 3000,
      extendedTimeOut: 3000
        }
 );
}
  unFollowQuestion(){
    var that = this;
    var qid = this.props.qid;
    var unfollowdown=that.props.followCount-1;
    $.ajax({
      type:'POST',
      url:'/unFollowQuestion/'+qid,
      data:{user:cookies.get('emailId')},
      success:function(data){
          that.setState({followBtn:true,followups:that.props.followCount-1});
          that.checkForSuccessAlert();
      },
      error:function(err){
          alert(err);
      }
    });
  }


  render(){
    const actions = [
          <FloatingActionButton mini={true} onClick={this.handleClose.bind(this)} style={{align:'center'}}>
            <i className="material-icons">close</i>
          </FloatingActionButton>
        ];
    return(
      <div>
        <ToastContainer ref='asd'
          toastMessageFactory={ToastMessageFactory}
          className='toast-top-center' style={{marginTop:'40%'}}/>
    <Paper  zDepth={5} style={styles.paper}>
      <Table style={{marginTop:'1%',marginBottom:'1%',}}>
        <TableBody displayRowCheckbox={false} style={{paddingTop:'5%'}}>
          <TableRow >
          <TableRowColumn style={{width:'100%'}}>
            <a className="question" onClick={this.fetchAnswer.bind(this)}><p>{this.props.question+'?'}</p></a>
            <Dialog
                actions={actions}
                modal={false}
                open={this.state.openAnswer}
                autoDetectWindowHeight={true}
                autoScrollBodyContent={true}
                repositionOnUpdate={true}
                onRequestClose={this.handleClose.bind(this)}
              >
                <h1><center><b><p className="individualquestion">{this.props.question}?</p></b></center></h1>
                {this.state.answers}
                {this.state.postButton?<Postanswer qid={this.props.qid}/>:''}
              </Dialog>


            <TableRowColumn colSpan="1" style={styles.col2}>
            <IconButton tooltip="Answers" onClick={this.postAnswer.bind(this)}>
            <i className="material-icons" style={{marginTop:'5%',cursor:'pointer'}} >create</i>
              </IconButton>
            </TableRowColumn>

            <TableRowColumn colSpan="1" style={styles.col1} >
              <Badge
                  badgeContent={this.state.followups}
                  primary={true}
                  style={styles.badge}
                >
                <IconButton tooltip="Followers">
                  <i className="material-icons md-48">people</i>
                  </IconButton>

                </Badge>
                 </TableRowColumn>



              <TableRowColumn colSpan="2" >
             {this.state.button?(this.state.followBtn?<RaisedButton  primary={true} style={styles.followBtn} onClick={this.followQuestion.bind(this)}>
                   Follow
                </RaisedButton>:
                <RaisedButton  primary={true} style={styles.followBtn} onClick={this.unFollowQuestion.bind(this)}>
                   Unfollow
                </RaisedButton>):''}
              </TableRowColumn>

              <TableRowColumn colSpan="6" style={styles.col3}>-asked  <Moment fromNow>{(this.props.timestamp).toString()}</Moment>   by
                <Chip
                >
                  <Avatar size={32} color={grey50} backgroundColor={grey900}>
                  {this.state.firstletter}
                  </Avatar>
                  {this.props.postedBy}
                </Chip>
              </TableRowColumn>
          </TableRowColumn>


          {/* <TableRowColumn colSpan="2" style={styles.col2}><a onClick={this.postAnswer.bind(this)}>Post your answer</a>
            <Dialog
                actions={actions}
                modal={false}
                open={this.state.openEditor}
                autoDetectWindowHeight={true}
                autoScrollBodyContent={true}
                repositionOnUpdate={true}
                onRequestClose={this.handleClose.bind(this)}
              >
                <div>
                <h1><center><b><p className="individualquestion">{this.props.question}?</p></b></center></h1>
                <Divider />
                <div className="text">
                <div className="form-group">
                  <label for="exampleTextarea">Answer</label>
                  <textarea className="form-control" id="exampleTextarea" rows="13" onChange={this.answerChange.bind(this)}></textarea>
                </div>
                <RaisedButton  primary={true} style={styles.submitbtn} disabled={this.state.buttonStatus} onClick={this.postAnswer.bind(this)}>Post your answer</RaisedButton>
              </div>
            </div>
              </Dialog>
            </TableRowColumn>*/}
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
    </div>
    )};
}
