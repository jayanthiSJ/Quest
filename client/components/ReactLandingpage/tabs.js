import React from 'react';
import $ from 'jquery';
import {Tabs, Tab} from 'material-ui/Tabs';
import {grey900,indigo200} from 'material-ui/styles/colors.js';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import Defaultimg from './../../images/default_profile.jpg';
import Logo from './../../images/QandA.jpg';
import IndividualQuestion from './individualquestion.js';
import Question from './question.js';
import Editor from './texteditor.js';
import './reactlandingpage.css';



const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    marginLeft:'8%'
  },

  tab:{
    marginTop:'6%',
    marginLeft:'0%',
    width:'100%',
    fontFamily: 'Times New Roman'
  },

  tabBtn:{
    backgroundColor:grey900,
    fontFamily: 'Times New Roman'
  }
};


class Questiontabs extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        slideIndex: 0,
        topratedquestions:'',
        latestquestions:'',
        unansweredquestions:'',
      };
    }

    componentWillMount(){
      const self=this;
      var name = 'topquestions';
         $.ajax({
           type:'GET',
           url:'/question/'+name,
           data:{},
           success:function(callback){
          var  topratedQuestions = callback.map((row,index)=> {
               return <Question question = {row.question} followCount={row.followcount} postedBy={row.postedBy} answerCount={row.answercount} qid={row.questionid} key = {index}/>
             });
             self.setState({topratedquestions : topratedQuestions});
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
          const self=this;
          var name = 'topquestions';
             $.ajax({
               type:'GET',
               url:'/question/'+name,
               data:{},
               success:function(callback){
              var  topratedQuestions = callback.map((row,index)=> {
                   return <Question question = {row.question} followCount={row.followcount} postedBy={row.postedBy} answerCount={row.answercount} qid={row.questionid} key = {index}/>
                 });
                 self.setState({topratedquestions : topratedQuestions});
               },
               error:function(err){
                 alert(err);
               }
             });
         }

         getLatestQuestions(){
           const self=this;
           var name = 'latestquestions';
              $.ajax({
                type:'GET',
                url:'/question/'+name,
                data:{},
                success:function(callback){
               var  latestquestions = callback.map((row,index)=> {
                    return <Question question = {row.question} followCount={row.followcount} postedBy={row.postedBy} answerCount={row.answercount} qid={row.questionid} key = {index}/>
                  });
                  self.setState({latestquestions : latestquestions});
                },
                error:function(err){
                  alert(err);
                }
              });
          }

          getTopAnsweredQuestions(){
            const self=this;
            var name = 'topAnswered';
               $.ajax({
                 type:'GET',
                 url:'/question/'+name,
                 data:{},
                 success:function(callback){
                var  topAnswered = callback.map((row,index)=> {
                     return <Question question = {row.question} followCount={row.followcount} postedBy={row.postedBy} answerCount={row.answercount} qid={row.questionid} key = {index}/>
                   });
                   self.setState({topAnswered : topAnswered});
                 },
                 error:function(err){
                   alert(err);
                 }
               });
          }

         getUnAnsweredQuestions(){
           const self3=this;
           var name = 'unanswered';
           var count;
              $.ajax({
                type:'GET',
                url:'/question/'+name,
                data:{},
                 success:function(callback){
            console.log(callback);
               var  unansweredQuestions = callback.result.records.map((row,index)=> {
              console.log("count:"+row._fieldLookup.follow_count);
              if(row._fieldLookup.follow_count == 'undefined')
              {
                count = 0;
              }
              else{
                count = row._fieldLookup.follow_count;
              }
              console.log(count);
              return <Question question = {row._fields[0].properties.value} followCount={count} key = {index}/>
            })
            self3.setState({unansweredquestions : unansweredQuestions});
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
          style={styles.swipe}
        >
          <div style={styles.slide}>
            {this.state.topratedquestions}
          </div>
          <div style={styles.slide}>
            {this.state.latestquestions}
          </div>
          <div style={styles.slide}>
            {this.state.unansweredquestions}
          </div>
          <div style={styles.slide}>
            {this.state.unansweredquestions}
          </div>
          <div style={styles.slide}>
            <Editor/>
          </div>
        </SwipeableViews>
  </div>
  </div>


)};
};
export default Questiontabs;
