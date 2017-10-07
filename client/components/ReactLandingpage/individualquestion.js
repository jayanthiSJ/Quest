import React from 'react';
import Divider from 'material-ui/Divider';
import {Row,Col} from 'react-flexbox-grid';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Card, CardText} from 'material-ui/Card';
import Moment from 'react-moment';
import './reactlandingpage.css';

const styles = {
  card:{
    margin:'2%',
    textAlign:'justify',
    padding:'2%',
    fontFamily: 'Times New Roman'
  },
  cardtext:{
    fontFamily: 'Times New Roman',
    fontSize:'120%',
    textAlign:'justify'
  },
  cardtext1:{
    fontFamily: 'Times New Roman',
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
        disable:false
      }
    };



like(){
  var that = this;
  var up=that.state.like+1;
  that.setState({like:up,disable:true});

}

dislike(){
  var that = this;
  var down=that.state.dislike+1;
  that.setState({dislike:down,disable:true});

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
              <Col start xs={1} sm={1} md={1} className="voteBtn">
                <FloatingActionButton  mini={true} disabled={this.state.disable} onClick={this.like.bind(this)}>
                  <i className="material-icons">thumb_up</i>
                </FloatingActionButton>
              </Col>
              <Col start xs={1} sm={1} md={1} className="voteCnt">
                  {this.state.like}
              </Col>
              <Col start='xs sm md lg' xs={1} sm={1} md={1} className="voteBtn">
                <FloatingActionButton  mini={true} disabled={this.state.disable} onClick={this.dislike.bind(this)}>
                  <i className="material-icons">thumb_down</i>
                </FloatingActionButton>
              </Col>
              <Col start xs={1} sm={1} md={1} className="voteCnt">
                  {this.state.dislike}
              </Col>
                <Col start='xs sm md lg' xs={2} sm={4} md={6} >
                  <CardText style={styles.cardtext1}>-answered  <Moment fromNow>{(this.props.time).toString()}</Moment> by <a>{this.props.answered_by}</a></CardText>
                </Col>
            </Row>
        </Card>
    </div>
)};
};
export default IndividualQuestion;
