import React  from 'react';
import Moment from 'react-moment';
import {Link,Redirect} from 'react-router-dom';
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
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import {grey900,indigo200} from 'material-ui/styles/colors.js';
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
    fontSize:'120%'
  },
  col2:{
    textAlign: 'center',
    border:'10px solid',
    borderColor:'white',
    whiteSpace:'inherit',
    fontFamily: 'Roboto',
    fontSize:'120%'
  },
  col3:{
    whiteSpace:'inherit',
    fontFamily: 'Roboto',
    fontSize:'120%',
    textAlign:'right'
  },
  followBtn:{
    marginLeft:'10%'
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
        dialog:'',
        openAnswer: false,
        buttonStatus:true,
        displayAnswerCount:true,
        postButton:false,
        followBtn:true,
        button:false,followups:this.props.followCount,
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
    if(user == 'undefined'){
      this.setState({button:false});
      alert("nouser:"+this.state.button);
    }
    else{
      alert("user:"+this.state.button);
      this.setState({button:true});
    }

    var that = this;
    alert(user);
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
          if(answers == 'No answers!!!!!'){
            answers = <Postanswer qid={qid}/>
            that.setState({postButton:false});
          }
          else{
            that.setState({postButton:true});
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
          alert("unFollow success");
      },
      error:function(err){
          alert(err);
      }
    });
  }


  render(){
    console.log(this.props.followCount+"!!!!!!!!!!!!!!!");
    const actions = [
          <FloatingActionButton mini={true} onClick={this.handleClose.bind(this)} style={{align:'center'}}>
            <i className="material-icons">close</i>
          </FloatingActionButton>
        ];
    return(
      <div>
      <Paper  zDepth={5} style={styles.paper}>
      <Table >
        <TableBody displayRowCheckbox={false}>
          <TableRow >
            <TableRowColumn colSpan="2" style={styles.col1}>{this.state.followups} {this.state.follower}</TableRowColumn>
            {this.state.displayAnswerCount?<TableRowColumn colSpan="2" style={styles.col2}>{this.props.answerCount} {this.state.answer}</TableRowColumn>:''}
            <TableRowColumn colSpan="4" >
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
                  {this.state.postButton?<Row center='xs sm md lg'>
                                            <Col xs={4} sm={6} md={12} >
                                              <RaisedButton
                                                label="Post your answer"
                                                primary={true}
                                                icon={<i className="material-icons">mode_edit</i>}
                                                onClick={this.postAnswer.bind(this)}/>
                                            </Col>
                                          </Row>:''}
                </Dialog>
              <TableRowColumn colSpan="3" style={styles.col3}>-asked  <Moment fromNow>{(this.props.timestamp).toString()}</Moment>   by  <a href="">{this.props.postedBy}</a></TableRowColumn>
            </TableRowColumn>
            <TableRowColumn colSpan="2" >
              <h1>{this.state.button}</h1>
              {this.state.button?(this.state.followBtn?<RaisedButton  primary={true} style={styles.followBtn} onClick={this.followQuestion.bind(this)}>
                 Follow
              </RaisedButton>:
              <RaisedButton  primary={true} style={styles.followBtn} onClick={this.unFollowQuestion.bind(this)}>
                 Unfollow
              </RaisedButton>):''}
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
