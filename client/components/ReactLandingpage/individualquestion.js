import React from 'react';
import Divider from 'material-ui/Divider';
import {Row,Col} from 'react-flexbox-grid';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardText} from 'material-ui/Card';
import Moment from 'react-moment';
import './reactlandingpage.css';
import Cookies from 'universal-cookie';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);


const cookies = new Cookies();
var token = cookies.get('token');
const styles = {
  card:{
    margin:'2%',
    textAlign:'justify',
    padding:'2%',
    fontFamily: 'Roboto',
    borderColor:'black'
  },
  cardtext:{
    fontFamily: 'Roboto',
    fontSize:'120%',
    textAlign:'justify'
  },
  cardtext1:{
    fontFamily: 'Roboto',
    fontSize:'100%',
  }
}
class IndividualQuestion extends React.Component {
  constructor(props) {
      super(props);
      this.state={
        like:this.props.likes,
        dislike:this.props.dislikes,
        time:new Date().toString(),
        disable:false,
        token:null,
        btnStatus:false
      }
    };

    componentWillMount(){
      this.setState({token:token});
      if(token != null){
        this.setState({btnStatus:true});
      }
    }

    checkForLikeSuccessAlert() {
      this.props.toaster.success(
          'Liked successfully',
        '', {
          timeOut: 3000,
          extendedTimeOut: 3000
            }
      );
      }
      checkForLikeFailedAlert() {
          this.props.toaster.error(
            'Error while liking..!',
          '', {
            timeOut: 3000,
            extendedTimeOut: 3000
              }
        );
        }
like(){
  var that = this;
  var up=that.props.likes+1;
  var aid = this.props.answerid;
  that.setState({like:up,disable:true});
   $.ajax({
             url:'/answerLikes/'+aid,
             data:{user:cookies.get('emailId')},
             type:'POST',
             success:function(data)
             {
               that.checkForLikeSuccessAlert();
             },
             error:function(err)
             {
              that.checkForLikeFailedAlert();
             }


   });

}
checkForDisLikeSuccessAlert() {
    this.props.toaster.error(
      'DisLiked successfully',
    '', {
      timeOut: 3000,
      extendedTimeOut: 3000
        }
  );
}checkForDisLikeErrorAlert() {
      this.props.toaster.error(
        'Error while DisLiking ',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
          }
    );
    }
dislike(){
  var that = this;
  var down=that.props.dislike+1;
  that.setState({dislike:down,disable:true});
  var aid = this.props.answerid;
  $.ajax({
            url:'/answerDislikes/'+aid,
            data:{user:cookies.get('emailId')},
            type:'POST',
            success:function(data)
            {
              that.checkForDisLikeSuccessAlert();
            },
            error:function(err)
            {
              that.checkForDisLikeErrorAlert();
            }


  });

}

render(){
  return(
    <div>

        <Card style={styles.card}>
            <Row center='xs sm md lg'>
              <Col xs={4} sm={6} md={12} >
                  <CardText style={styles.cardtext}>{this.props.answer}</CardText>
              </Col>
            </Row>
            <Row center='xs sm md lg'>
              {this.state.token && <div> <Col start xs={1} sm={1} md={1} className="voteBtn">
              <FloatingActionButton  mini={true}  onClick={this.like.bind(this)}>
                  <i className="material-icons">thumb_up</i>
                </FloatingActionButton>
              </Col>
              <Col end xs={1} sm={1} md={1} className="voteCnt">
                {this.state.like}
              </Col> </div>}
                {this.state.token && <div>  <Col start='xs sm md lg' xs={1} sm={1} md={1} className="voteBtn">
              <FloatingActionButton  mini={true}  onClick={this.dislike.bind(this)}>
                  <i className="material-icons">thumb_down</i>
                </FloatingActionButton>
              </Col>
          <Col end xs={1} sm={1} md={1} className="voteCnt">
                  {this.state.dislike}
              </Col> </div>}
                <Col start='xs sm md lg' xs={2} sm={4} md={6} >
                  <CardText style={styles.cardtext1}>Answered  <Moment fromNow>{(this.props.timestamp).toString()}</Moment> by <a>{this.props.answered_by}</a></CardText>
                </Col>
            </Row>
        </Card>
    </div>
)};
};
export default IndividualQuestion;
