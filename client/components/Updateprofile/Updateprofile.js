import React from 'react';
import {Paper,TextField,RaisedButton} from 'material-ui';
import Dropzone from 'react-dropzone';
import { Dropdown,Button,Image} from 'semantic-ui-react';
import request from 'superagent';
import {path} from 'path';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
var user = cookies.get('emailId');
const styles = {
  paper: {
    color:'#EC407A',
    width: '70%',
    height: '500px',
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
 this.state ={picture:"profile.png",allFiles: []};//,name :"",dob :"", gender:null,country:null,state:null,city:null,phone :null};
 }

checkForSuccessfullyUploadedAlert() {
  //console.log("inside check for Successfully uploaded!!! alert");
  let context = this;
  this.refs.asd.success(
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
    //console.log("inside upload",this.state.allFiles)
    photo.append('IMG', this.state.allFiles);
    let self = this;
    request.post('/upload').send(photo).end(function(err, resp) {
        if (err) {
            console.error(err);
        } else {
          console.log(resp.text);
          self.saveImage(resp.text);
        }
    });
  }

    saveImage(image) {
      alert(image);
    let context = this;
    $.ajax({
        method: 'POST',
        url: '/uploadImage',
        data: {
            picture: image, name: cookies.get('emailId')
        }
    }).then(function(response) {
      console.log(image);
      context.uploadSuccess(image);

      //console.log(response);
    }).catch(function(err) {
        //console.log(err);
    });
}

  // { if image uploaded successfully}
uploadSuccess(imagenew)
{
  // this.setState({closeButton:false});
  alert("Successfully uploaded!!!");
  //this.checkForSuccessfullyUploadedAlert();
  this.setState({picture:imagenew});
  console.log("imgnew:"+this.state.picture);

}

render()
{
  const { active } = this.state;
    let imagechange = null;
    let context = this;
    let pic=this.state.picture;
    console.log("picture::::"+pic)
    console.log(this.state.statusInformation);
    if(this.state.picture!='')
    {
    console.log("picture::::"+pic);
    console.log(this.state.statusInformation);
    if(this.state.allFiles.preview == undefined)
    {
      //console.log("undefined");
      imagechange = (<Image src={require("../../../pictures/"+pic)} style={{
            height: 200,width: 200
        }}/>);
        //console.log(pic);
    }
    else{
          //console.log("defined"+this.state.allFiles.preview);
          imagechange = (<Image src={this.state.allFiles.preview} style={{
              height: 200,width:200
          }}/>);
        }
         }
   else {
          imagechange = (
           <Image src={require("../../../pictures/profile.png")}
                   size='large' style= {{
                     height: 200,width:200
                 }}/>);
      }
return(
  <Paper style={styles.paper}>

  <div>
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
