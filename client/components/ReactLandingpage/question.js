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
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import {grey900,indigo200} from 'material-ui/styles/colors.js';
import IndividualQuestion from './individualquestion.js';
import './reactlandingpage.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const styles = {
  col1:{
    textAlign: 'center',
    whiteSpace:'inherit',
    fontFamily: 'Times New Roman',
    fontSize:'120%'
  },
  col2:{
    textAlign: 'center',
    border:'10px solid',
    borderColor:'white',
    whiteSpace:'inherit',
    fontFamily: 'Times New Roman',
    fontSize:'120%'
  },
  col3:{
    whiteSpace:'inherit',
    fontFamily: 'Times New Roman',
    fontSize:'120%',
    textAlign:'right'
  },
  followBtn:{
    marginLeft:'10%'
  },
  submitbtn:{
    width:'50%',
    fontFamily: 'Times New Roman',
    marginLeft:'25%'
  }
};

var user = cookies.get('displayname');
export default class Question extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        vote:'votes',
        answer:'answers',
        answers:'',
        openAnswer: false,
        openEditor: false,
        newAnswer:'',
        buttonStatus:true,
        displayAnswerCount:true
      };

    }
    componentWillMount(){
    if((this.props.followCount)<=1){
      this.setState({vote:'vote'});
    }
    if((this.props.answerCount)<=1){
      this.setState({answer:'answer'});
    }
    if(user == undefined){
      this.setState({buttonStatus:true});
    }
    else{
      this.setState({buttonStatus:false});
    }

    if(this.props.name == "unanswered"){
      this.setState({displayAnswerCount:false});
    }
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
            answers = 'No answers!!!!!'
          }
          else{
            answers = answers.map((row,index)=> {
             return <IndividualQuestion answer={row.answer} answered_by={row.answered_by} likes={row.likes} dislikes={row.dislikes} answerid={row.answerId} key = {index}/>
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
    this.setState({openAnswer: false,openEditor: false});
  }

  answerChange(e){
    this.setState({newAnswer:e.target.value});
  }

  openDialog(){
    var that =this;
    that.setState({openEditor:true});
  }

  postAnswer(){
    var that =this;
    var qid = this.props.qid;
    $.ajax({
      type:'POST',
      url:'/answer/'+qid,
      data:{user:cookies.get('emailId'),answer:that.state.newAnswer,time:new Date()},
      success:function(data){
          that.setState({openEditor: false});
          alert("Posted Successfully!!!");
      },
      error:function(err){
          alert(err);
      }
      })
  }

  followQuestion(){
    var qid = this.props.qid;
    $.ajax({
      type:'POST',
      url:'/followQuestion/'+qid,
      data:{user:cookies.get('emailId')},
      success:function(data){
          alert("follow success");
      },
      error:function(err){
          alert(err);
      }
      })
  }
  unFollowQuestion(){
    alert("unFollowed Successfully");
    var qid = this.props.qid;
    $.ajax({
      type:'POST',
      url:'/unFollowQuestion/'+qid,
      data:{user:cookies.get('emailId')},
      success:function(data){
          alert("unFollow success");
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
      <Paper  zDepth={5} >
      <Table>
        <TableBody displayRowCheckbox={false}>
          <TableRow >
            <TableRowColumn colSpan="2" style={styles.col1}>{this.props.followCount} {this.state.vote}</TableRowColumn>
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
                </Dialog>
              <TableRowColumn colSpan="3" style={styles.col3}>-asked  <Moment fromNow>{(this.props.timestamp).toString()}</Moment>   by  <a href="">{this.props.postedBy}</a></TableRowColumn>
            </TableRowColumn>
            <TableRowColumn colSpan="2" >
              <RaisedButton  primary={true} style={styles.followBtn} onClick={this.followQuestion.bind(this)}>
                 Follow
              </RaisedButton>
            </TableRowColumn>
            <TableRowColumn colSpan="2" >
              <RaisedButton  primary={true} style={styles.followBtn} onClick={this.unFollowQuestion.bind(this)}>
                 Unfollow
              </RaisedButton>
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
