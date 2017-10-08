import React from 'react';
import $ from 'jquery';
import {Tabs, Tab} from 'material-ui/Tabs';
import {grey900,indigo200} from 'material-ui/styles/colors.js';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import Defaultimg from './../../images/default_profile.jpg';
import Logo from './../../images/QandA.jpg';
import IndividualQuestion from './individualquestion.js';
import {Card, CardActions, CardTitle, CardText,CardMedia,CardHeader} from 'material-ui/Card';
import Question from './question.js';
import Editor from './texteditor.js';
import './reactlandingpage.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    marginLeft:'8%',

  },

  tab:{
    marginTop:'-3%',
    marginLeft:'0%',
    width:'100%',
    fontFamily: 'Times New Roman',
    paddingTop: '5%'
  },

  tabBtn:{
    backgroundColor:grey900,
    fontFamily: 'Times New Roman',
  },

  swipe:{
    marginTop:'10%'
  }
};
var user = cookies.get('displayname');
class Questiontabs extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        slideIndex: 0,
        topratedquestions:'',
        latestquestions:'',
        unansweredquestions:'',
        topansweredquestions:'',
        token: null,
        logStatus:false
      };
    }

    componentWillMount(){
      var that=this;
      let token = localStorage.getItem('token');
      alert(user);
      if(user != ''){
        that.setState({logStatus:true});
      }
      var name = 'topquestions';
         $.ajax({
           type:'GET',
           url:'/question/'+name,
           data:{},
           success:function(data){
          var  topratedQuestions = data.map((row,index)=> {
               return <Question name="topquestions" question = {row.question} followCount={row.followcount} postedBy={row.postedBy} timestamp={row.time} answerCount={row.answercount} qid={row.questionid} key = {index}/>
             });
             that.setState({topratedquestions : topratedQuestions, token: token});
           },
           error:function(err){
             alert(err);
           }
         });
    }

    handleChange(value){
      this.setState({
        slideIndex: value
      });
    }

        getTopQuestions(){
          var that=this;
          var name = 'topquestions';
             $.ajax({
               type:'GET',
               url:'/question/'+name,
               data:{},
               success:function(data){
              var  topratedQuestions = data.map((row,index)=> {
                   return <Question name="topquestions" question = {row.question} followCount={row.followcount} postedBy={row.postedBy} timestamp={row.time} answerCount={row.answercount} qid={row.questionid} key = {index}/>
                 });
                 that.setState({topratedquestions : topratedQuestions});
               },
               error:function(err){
                 alert(err);
               }
             });
         }

         getLatestQuestions(){
           var that=this;
           var name = 'latestquestions';
              $.ajax({
                type:'GET',
                url:'/question/'+name,
                data:{},
                 success:function(data){
                   var  latestQuestions = data.map((row,index)=> {
                  return <Question name="latestquestions" question = {row.question} followCount={row.followcount} postedBy={row.postedBy} timestamp={row.time} answerCount={row.answercount} qid={row.questionid}  key = {index}/>
                });
                that.setState({latestquestions : latestQuestions});
              },
              error:function(err){
                alert(err);
              }
        });
          }

          getTopAnsweredQuestions(){
            var that=this;
            var name = 'topAnswered';
               $.ajax({
                 type:'GET',
                 url:'/question/'+name,
                 data:{},
                  success:function(data){
                    var  topansweredQuestions = data.map((row,index)=> {
                   return <Question name="topAnswered" question = {row.question} followCount={row.followcount} postedBy={row.postedBy}  answerCount={row.answercount} qid={row.questionid} timestamp={row.time}  key = {index}/>
                 });
                 that.setState({topansweredquestions : topansweredQuestions});
               },
               error:function(err){
                 alert(err);
               }
         });
          }

         getUnAnsweredQuestions(){
           var that=this;
           var name = 'unanswered';
              $.ajax({
                type:'GET',
                url:'/question/'+name,
                data:{},
                 success:function(data){
                   console.log("data",data);
                   var  unansweredQuestions = data.map((row,index)=> {
                  return <Question name="unanswered" question = {row.question} followCount={row.followcount} postedBy={row.postedBy} timestamp={row.time} qid={row.questionid} key = {index}/>
                });
                that.setState({unansweredquestions : unansweredQuestions});
              },
              error:function(err){
                alert(err);
              }
        });
         }
render(){
  return(
  <div className="row container-fluid">
    <div >
       <Tabs
          onChange={this.handleChange.bind(this)}
          value={this.state.slideIndex}
          style={styles.tab}
        >
          <Tab style={styles.tabBtn} label="Top Questions" value={0} onActive={this.getTopQuestions.bind(this)} />
          <Tab style={styles.tabBtn} label="Latest" value={1} onActive={this.getLatestQuestions.bind(this)}/>
          <Tab style={styles.tabBtn} label="Top Answered" value={2} onActive={this.getTopAnsweredQuestions.bind(this)}/>
          <Tab style={styles.tabBtn} label="Unanswered" value={3} onActive={this.getUnAnsweredQuestions.bind(this)}/>
          <Tab style={styles.tabBtn} label="Ask questions" value={4} />
          </Tabs>


        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange.bind(this)}
        >
          <div style={styles.slide}>
            {this.state.topratedquestions}
          </div>
          <div style={styles.slide}>
            {this.state.latestquestions}
          </div>
          <div style={styles.slide}>
            {this.state.topansweredquestions}
          </div>
          <div style={styles.slide}>
            {this.state.unansweredquestions}
          </div>
          <div style={styles.slide}>
            {(this.state.logStatus) ? <Editor/> : <center><b>Signin/Signup to continue</b></center>}
          </div>
        </SwipeableViews>

  </div>
  </div>


)};
};
export default Questiontabs;
