import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IndividualQuestion from '../ReactLandingpage/individualquestion.js';
import Dialog from 'material-ui/Dialog';
import $ from 'jquery';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const styles={
  submitbtn:{
    width:'50%',
    marginLeft:'25%',
    marginTop:'5%'
  }
}

class Editor extends React.Component {

  constructor(props) {
      super(props);
      this.state={
        title:'',
        description:'',
        openAnswer: false
      }
    }

    handleClose(){
      this.setState({openAnswer: false});
    }

    titleChange(e){
      this.setState({title:e.target.value});
    }
    descriptionChange(e){
      this.setState({description:e.target.value});
    }
    postQuestion(){
      alert("inside post");
      var that = this;
      $.ajax({
               url: '/question',
               type: 'POST',
               data: {
                   title: that.state.title,
                   searchValue: that.state.description,
                   user:cookies.get('emailId')
               },
               success: function(response) {
                   if(response == "Question posted"){
                     alert("Posted succesfully");
                   }
                   else{
                     that.setState({openAnswer: true});
                     answers = answers.map((row,index)=> {
                      return <IndividualQuestion answer={row.answer} answered_by={row.answered_by} likes={row.likes} dislikes={row.dislikes} key = {index}/>
                    });
                  }
                  that.setState({answers : answers});
               },
               error: function(err) {
                   alert(err);
               }
           })
    }
    render() {
      const actions = [
            <FloatingActionButton mini={true} onClick={this.handleClose.bind(this)} style={{align:'center'}}>
              <i className="material-icons">close</i>
            </FloatingActionButton>
          ];
        return (
          <div className="text">
          <div className="form-group">
            <label for="usr">Title</label>
            <input type="text" className="form-control" id="usr" onChange={this.titleChange.bind(this)}/>
          </div>
          <div className="form-group">
            <label for="exampleTextarea">Description</label>
            <textarea className="form-control" id="exampleTextarea" rows="13" onChange={this.descriptionChange.bind(this)}></textarea>
          </div>
          <RaisedButton  primary={true} style={styles.submitbtn} onClick={this.postQuestion.bind(this)}>Post your question
          <Dialog
              actions={actions}
              modal={false}
              open={this.state.openAnswer}
              autoDetectWindowHeight={true}
              autoScrollBodyContent={true}
              repositionOnUpdate={true}
              onRequestClose={this.handleClose.bind(this)}
            >
              <h1><center><b><p className="individualquestion">{this.state.description}?</p></b></center></h1>
              {this.state.answers}
            </Dialog>
          </RaisedButton>
          </div>
        );
    }
}

export default Editor;
