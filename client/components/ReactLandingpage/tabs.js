import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {blueGrey500} from 'material-ui/styles/colors.js';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import Question from './question.js';
import Editor from './texteditor.js';
import './reactlandingpage.css';
import Defaultimg from './../../images/default_profile.jpg';
import Logo from './../../images/QandA.jpg';


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
  }
};


class Questiontabs extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        slideIndex: 0,
      };
    }

    handleChange(value){
      this.setState({
        slideIndex: value
      });
      switch (value) {
        case 0:
            $.ajax({
              type:'get',
              url:'/data/topquestions',
              success:function(req,res){
                alert("inside get question success");
              },
              error:function(err){
                alert(err);
              }
            });
            break;

          case 1:
              $.ajax({
                type:'get',
                url:'/data/latestQuestions',
                success:function(req,res){
                  alert("inside get latest question success");
                },
                error:function(err){
                  alert(err);
                }
              });
              break;

            case 2:

                $.ajax({
                  type:'get',
                  url:'/data/topAnswered',
                  success:function(req,res){
                    alert("inside get latest question success");
                  },
                  error:function(err){
                    alert(err);
                  }
                });
                break;

              case 3:

                  $.ajax({
                    type:'get',
                    url:'/data/unanswered',
                    success:function(req,res){
                      alert("inside get unanswerd question success");
                    },
                    error:function(err){
                      alert(err);
                    }
                  });
                  break;
                  case 4:
                      $.ajax({
                        type:'get',
                        url:'/data/questions',
                        success:function(req,res){
                          alert("inside ask question success");
                        },
                        error:function(err){
                          alert("error occured...!!!!");
                        }
                      });
                      break;

      }
    };

render(){
  return(
  <div className="row container-fluid">
    <div >
        <Tabs
          onChange={this.handleChange.bind(this)}
          value={this.state.slideIndex}
          style={styles.tab}
        >
          <Tab label="Top Questions" value={0} />
          <Tab label="Newest" value={1} />
          <Tab label="Top Answered" value={2} />
          <Tab label="Unanswered" value={3} />
          <Tab label="Ask questions" value={4} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange.bind(this)}
          style={styles.swipe}
        >
          <div style={styles.slide}>
            <Question/>
            <Question/>
            <Question/>
            <Question/>
            <Question/>
            <Question/>
            <Question/>
            <Question/>
          </div>
          <div style={styles.slide}>
            <Question/>
            <Question/>
            <Question/>
            <Question/>
            <Question/>
            <Question/>
          </div>
          <div style={styles.slide}>
            <Question/>
            <Question/>
            <Question/>
            <Question/>
            <Question/>
            <Question/>
          </div>
          <div style={styles.slide}>
            <Question/>
            <Question/>
            <Question/>
            <Question/>
            <Question/>
            <Question/>
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
