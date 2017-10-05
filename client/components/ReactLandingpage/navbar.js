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


    </div>
  </nav>

      </div>

)};
};
export default Navbar;
