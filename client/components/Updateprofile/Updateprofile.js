import React from 'react';
import {Paper,TextField,RaisedButton} from 'material-ui';
import Dropzone from 'react-dropzone';
import { Dropdown,Button,Image} from 'semantic-ui-react';
import request from 'superagent';
import {path} from 'path';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
var user = cookies.get('emailId');
const styles = {
  paper: {
    color:'#EC407A',
    width: '70%',
    height: '400px',
    margin: 'auto',
    padding: '60px',
    background:'#B2DFDB',
  },
};
export default class Updateprofile extends React.Component
{
 constructor()
 {
 super();
 this.state ={picture:"profile.jpg",allFiles: []};
 }
 componentWillMount() {
   let that = this;
   this.setState({
     picture: that.props.picture
   })
 }
checkForSuccessfullyUploadedAlert() {
  let that = this;
  that.refs.asd.success(
    'Photo uploaded successfully!!!',
    '', {
    timeOut: 3000,
    extendedTimeOut: 3000
  }
);
}
onImageDrop(files) {
     this.setState({allFiles: files[0],buttonDisable:false});
  }
uploadImage()
{
    let photo = new FormData();
    photo.append('IMG', this.state.allFiles);
    let that = this;
    request.post('/upload').send(photo).end(function(err, resp) {
        if (err) {
            console.error(err);
        } else {
          that.saveImage(resp.text);
        }
    });
  }
    saveImage(image) {
    let that = this;
    $.ajax({
        method: 'POST',
        url: '/uploadImage',
        data: {
            picture: image, name: cookies.get('emailId')
        }
    }).then(function(response) {
      that.uploadSuccess(image);
      that.props.changePicture(image);
    }).catch(function(err) {
    });
}
uploadSuccess(imagenew)
{
  this.checkForSuccessfullyUploadedAlert();
  this.setState({picture:imagenew});
}
render()
{
  const { active } = this.state;
    let imagechange = null;
    let context = this;
    let pic=this.state.picture;
    if(this.state.picture!='')
    {
    if(this.state.allFiles.preview == undefined)
    {
      imagechange = (<Image src={require("../../images/"+pic)} style={{
            height: 200,width: 190
        }}/>);
    }
    else{
          imagechange = (<Image src={this.state.allFiles.preview} style={{
              height: 200,width:190
          }}/>);
        }
         }
   else {
          imagechange = (
           <Image src={require("../../images/profile.jpg")}
                   size='large' style= {{
                     height: 200,width:190
                 }}/>);
      }
return(
  <Paper style={styles.paper}>
  <div>
  <ToastContainer ref="asd"
    toastMessageFactory={ToastMessageFactory}
    className='toast-top-center'/>
      <br/>
      <b><i><center><p>Click on the image to change your profile image</p><br/></center></i></b>
      <center>
      <Image wrapped size='small'  >
                  <Dropzone multiple={true} accept={'image/*'}
                     onDrop={this.onImageDrop.bind(this)} >
                         {imagechange}
                      </Dropzone>
                      <br/>
                      {this.state.buttonColour?
                        <Button disabled={this.state.buttonDisable}  onClick={this.uploadImage.bind(this)}>Upload Photo
                      </Button>:
                      <Button disabled={this.state.buttonDisable}  onClick={this.uploadImage.bind(this)}>Upload Photo
                    </Button>}
      </Image>
      </center>
  </div>
 </Paper>
);
}
}
