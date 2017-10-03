import React from 'react';
import './reactlandingpage.css';
import Defaultimg from './../../images/default_profile.jpg';
import Logo from './../../images/QandA.jpg';
import {Link,Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import Update_profile from './../Updateprofile/Update_profile.js';
import $ from 'jquery';
const cookies = new Cookies();
class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.state={
      logout:false,
      logStatus:'',
      searchValue1:''
    }
  };

  changeSearchValue1(e){
    console.log("react:"+e.target.value);
    this.setState({searchValue1:e.target.value});
  }


logout(){
        alert(cookies.get('displayname'));
        cookies.remove('displayname');
        var self=this;
          $.ajax({
               url:'/users/logOut',
               type:'GET',
               success:function(data){
                   self.setState({logout:true});
               },
               error:function(err){
                 alert('Failed to logout!!!');
               }
          });
}

search1(){
  var search = this;
  alert("inside ajax:"+search.state.searchValue1);
  $.ajax({
    url:'/search',
    type:'POST',
    dataType:'json',
    data:{"searchValue":search.state.searchValue1},
    success: function(response) {
        alert(response);
    },
    error: function(err) {
        alert(JSON.stringify(err));
    }
  })
}

render(){
  if(this.state.logout){
              this.setState({logStatus: <Redirect to='/'/>}) ;
       }
  return(
    <div >
    <nav className="navbar navbar-default navbar-static-top" role="navigation">
    {/*} Brand and toggle get grouped for better mobile display */}
    <div className="navbar-header">
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <Link to="/"><img className="qaimage" src={Logo}/></Link>
    </div>

    {/*Collect the nav links, forms, and other content for toggling */}
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <div className="col-sm-8 col-md-6">
          <form className="navbar-form" role="search" onSubmit={this.search1.bind(this)}>
          <div className="input-group">
              <input type="text" className="form-control" placeholder="Search" onChange={this.changeSearchValue1.bind(this)}/>
              <div className="input-group-btn">
                  <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
              </div>
          </div>
          </form>
      </div>

      <ul className="nav navbar-nav navbar-right profileImg">
              <li className='username'><p><b><i>{cookies.get('displayname')}</i></b></p></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                <img className="inset" src={Defaultimg}/>
                 </a>
                <ul className="dropdown-menu" role="menu">
                  <li><a data-toggle="modal" data-target="#profile"><i className="fa fa-user"></i> Profile</a></li>
                  <li className="divider"></li>
                  <li><a href="#" onClick={this.logout.bind(this)}><span className="fa fa-power-off" ></span> Log Out</a></li>
                  {this.state.logStatus}
                </ul>
              </li>
            </ul>
    </div>
  </nav>
  <div id="profile" className="modal fade" role="dialog">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Edit profile</h4>
      </div>
      <div className="modal-body">
          <Update_profile/>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
      </div>

)};
};
export default Navbar;
