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
const styles = {
  col1:{
    textAlign: 'center',
    whiteSpace:'inherit'
  },
  col2:{
    backgroundColor:'green',
    textAlign: 'center',
    border:'10px solid',
    borderColor:'white',
    whiteSpace:'inherit'
  },
  col3:{
    textAlign: 'center',
    whiteSpace:'inherit'
  },
};

const dateToFormat = '1976-04-19T12:59-0500';
export default class Question extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        time:new Date().toString(),
        user:'Nive',
        votes:'500',
        answers:'300',
        views:'500'
      };
    }
  render(){
    return(
      <Paper  zDepth={5} >
      <Table>
        <TableBody displayRowCheckbox={false}>
          <TableRow >
            <TableRowColumn colSpan="2" style={styles.col1}>{this.state.votes} votes</TableRowColumn>
            <TableRowColumn colSpan="2" style={styles.col2}>{this.state.answers} answers</TableRowColumn>
            <TableRowColumn colSpan="2" style={styles.col3}>{this.state.views} views</TableRowColumn>
            <TableRowColumn colSpan="6">
              <Link to='/individualquestion' className="question">What is ReactJS?</Link>
              <TableRowColumn colSpan="5">-asked  <Moment fromNow>{this.state.time}</Moment>   by  <a href="">{this.state.user}</a></TableRowColumn>
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
      </Paper>
    )};
}
