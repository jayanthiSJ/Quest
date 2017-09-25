import React from 'react';
import './reactlandingpage.css';
import Defaultimg from './../../images/default_profile.jpg';
import Reactlandingpage from './reactlandingpage';
import Navbar from './navbar.js';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Logo from './../../images/QandA.jpg';
import {Link,Redirect} from 'react-router-dom';
import Divider from 'material-ui/Divider';
import {lightBlue500} from 'material-ui/styles/colors.js';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';
import {Row,Col} from 'react-flexbox-grid';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Share from 'material-ui/svg-icons/social/share';
import Edit from 'material-ui/svg-icons/image/edit';
import RaisedButton from 'material-ui/RaisedButton';
//import Up from 'material-ui/svg-icons/navigation/arrowdropup';
import Moment from 'react-moment';

const styles = {
  card:{
    marginTop:'6%',
    width:'150%',
    paddingLeft:'16%',
    paddingRight:'16%'
  },
  question:{
    fontSize:'140%',
    fontWeight:'bold',
    padding:'3%'
  },
  answers:{
    padding:'3%',
    fontSize:'120%',
    fontWeight:'bold'
  },
  sharebtn:{
    marginTop:'15%',
    marginLeft:'-355%'
  },
  editbtn:{
    marginTop:'15%',
    marginLeft:'-355%'
  },
  timestamp:{
    marginTop:'2%'
  },
  submitbtn:{
    width:'50%',
    marginLeft:'25%',
    marginTop:'5%',
    marginBottom:'5%',
  }
};


class IndividualQuestion extends React.Component {
  constructor(props) {
      super(props);
      this.state={
        vote:50,
        time:new Date().toString(),
        askQuestion:false
      }
    };

    titleChange(){

    }
    descriptionChange(){

    }
    postQuestion(){

    }

askQuestion(){
    this.setState({askQuestion:true});
}

voteUp(){
  var up=this.state.vote+1;
  this.setState({vote:up});
}

voteDown(){
  var down=this.state.vote-1;
  this.setState({vote:down});
}
render(){
  if(this.state.askQuestion){
      return(
      <Redirect to='/editor'/>
      );
  }
  return(
    <div>
        <Navbar/>
      <div className="row ">
        <Card style={styles.card}>
          <CardText style={styles.question}>
          What is react JS reusable components?
          <Row end='xs sm md lg'>
          <Col xs={6} sm={4} md={2}>
          <RaisedButton  primary={true}  onClick={this.askQuestion.bind(this)}>Ask Question</RaisedButton>
          </Col>
          </Row>
          </CardText>
          <Divider />
          <Row start='xs sm md lg'>
          <Col xs={6} sm={4} md={2}>
          <Row start='xs sm md lg'>
          <Col xs={6} sm={4} md={2}>
          <i className="fa fa-caret-up fa-5x " aria-hidden="true" onClick={this.voteUp.bind(this)} hoverColor={lightBlue500}></i>
            </Col>
            </Row>
            <Row start='xs sm md lg'>
            <Col xs={6} sm={4} md={2}>
              <p className="vote">
                  {this.state.vote}
              </p>
              </Col>
              </Row>
              <Row start='xs sm md lg'>
              <Col xs={6} sm={4} md={2}>
                <i className="fa fa-caret-down fa-5x" onClick={this.voteDown.bind(this)} hoverColor={lightBlue500} aria-hidden="true"></i>
                </Col>
                </Row>
            </Col>
            <Col xs={6} sm={8} md={10}>
            <CardText>What is react JS reusable components? Can anyone please explain this with proper example? Like how do I know its my reusable components and so on. I googled but could not get any proper answer.</CardText>

            <Row end='xs sm md lg'>
            <Col xs={6} sm={4} md={1}>
            <FloatingActionButton style={styles.sharebtn} mini={true}>
              <i className="material-icons">thumb_up</i>
            </FloatingActionButton>
            </Col>
            <Col xs={6} sm={4} md={1}>
            <FloatingActionButton style={styles.editbtn} mini={true}>
              <Edit />
            </FloatingActionButton >
            </Col>
            <Col xs={6} sm={4} md={8} >
              <CardText style={styles.timestamp}>-asked  <Moment fromNow>{this.state.time}</Moment></CardText>
            </Col>
            </Row>
            </Col>
            </Row>
            <Divider />
            <CardText style={styles.answers}>
              {this.state.answer}  2 Answers
            </CardText>
            <Divider />
            <Row start='xs sm md lg'>
            <Col xs={6} sm={4} md={2}>
            <Row start='xs sm md lg'>
            <Col xs={6} sm={4} md={2}>
            <i className="fa fa-caret-up fa-5x " aria-hidden="true" onClick={this.voteUp.bind(this)} hoverColor={lightBlue500}></i>
              </Col>
              </Row>
              <Row start='xs sm md lg'>
              <Col xs={6} sm={4} md={2}>
                <p className="vote">
                    {this.state.vote}
                </p>
                </Col>
                </Row>
                <Row start='xs sm md lg'>
                <Col xs={6} sm={4} md={2}>
                  <i className="fa fa-caret-down fa-5x" onClick={this.voteDown.bind(this)} hoverColor={lightBlue500} aria-hidden="true"></i>
                  </Col>
                  </Row>
              </Col>
              <Col xs={6} sm={8} md={10}>
              <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.This examples demonstrates how to use the included Material icon components.This examples demonstrates how to use the included Material icon components.</CardText>
              <Row end='xs sm md lg'>
              <Col xs={6} sm={4} md={8}>
                <CardText style={styles.timestamp}>-answered  <Moment fromNow>{this.state.time}</Moment></CardText>
              </Col>
              </Row>
              </Col>
              </Row>
              <Divider />
              <Row start='xs sm md lg'>
              <Col xs={6} sm={4} md={2}>
              <Row start='xs sm md lg'>
              <Col xs={6} sm={4} md={2}>
              <i className="fa fa-caret-up fa-5x " aria-hidden="true" onClick={this.voteUp.bind(this)} hoverColor={lightBlue500}></i>
                </Col>
                </Row>
                <Row start='xs sm md lg'>
                <Col xs={6} sm={4} md={2}>
                  <p className="vote">
                      {this.state.vote}
                  </p>
                  </Col>
                  </Row>
                  <Row start='xs sm md lg'>
                  <Col xs={6} sm={4} md={2}>
                    <i className="fa fa-caret-down fa-5x" onClick={this.voteDown.bind(this)} hoverColor={lightBlue500} aria-hidden="true"></i>
                    </Col>
                    </Row>
                </Col>
                <Col xs={6} sm={8} md={10}>
                <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.This examples demonstrates how to use the included Material icon components.This examples demonstrates how to use the included Material icon components.</CardText>
                <Row end='xs sm md lg'>
                <Col xs={6} sm={4} md={8}>
                  <CardText style={styles.timestamp}>-answered  <Moment fromNow>{this.state.time}</Moment></CardText>
                </Col>
                </Row>
                </Col>
                </Row>
                <Divider />
                <p className="youranswer">Your Answer</p>
                <Divider />
                <div className="text">
                <div className="form-group">
                  <label for="usr">Title</label>
                  <input type="text" className="form-control" id="usr" onChange={this.titleChange.bind(this)}/>
                </div>
                <div className="form-group">
                  <label for="exampleTextarea">Description</label>
                  <textarea className="form-control" id="exampleTextarea" rows="13" onChange={this.descriptionChange.bind(this)}></textarea>
                </div>
                <RaisedButton  primary={true} style={styles.submitbtn} onClick={this.postQuestion.bind(this)}>Post your answer</RaisedButton>
                </div>
        </Card>

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
export default IndividualQuestion;
