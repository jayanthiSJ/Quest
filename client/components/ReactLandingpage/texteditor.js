import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';

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
        description:''
      }
    }

    titleChange(e){

      this.setState({title:e.target.value});
    }
    descriptionChange(e){

      this.setState({description:e.target.value});
    }
    postQuestion(){
      alert("inside post");
      $.ajax({
               url: '/question',
               type: 'POST',
               data: {
                   title: this.state.title,
                   description: this.state.description
               },
               success: function(response) {
                   alert(response);
               },
               error: function(err) {
                   alert(err);
               }
           })
    }
    render() {
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
          <RaisedButton  primary={true} style={styles.submitbtn} onClick={this.postQuestion.bind(this)}>Post your question</RaisedButton>
          </div>
        );
    }
}

export default Editor;
