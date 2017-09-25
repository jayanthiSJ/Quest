import React from 'react';
import './reactlandingpage.css';
import Defaultimg from './../../images/default_profile.jpg';
import Logo from './../../images/QandA.jpg';
import {Link,Redirect} from 'react-router-dom';

class Navbar extends React.Component {
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
          <form className="navbar-form" role="search">
          <div className="input-group">
              <input type="text" className="form-control" placeholder="Search" name="q"/>
              <div className="input-group-btn">
                  <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
              </div>
          </div>
          </form>
      </div>

      <ul className="nav navbar-nav navbar-right">
              <li className='username'><p><b><i>Nivethitha Ravichandran Ramani</i></b></p></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                <img className="inset" src={Defaultimg}/>
                 </a>
                <ul className="dropdown-menu" role="menu">
                  <li><a href="#"><i className="fa fa-user"></i> Profile</a></li>
                  <li><a href="#"><span className="fa fa-envelope-o"></span> Contact</a></li>
                  <li><a href="#"><span className="fa fa-cogs"></span> Settings</a></li>
                  <li className="divider"></li>
                  <li><a href="#"><span className="fa fa-power-off"></span> Log Out</a></li>
                </ul>
              </li>
            </ul>
    </div>
  </nav>
      </div>

)};
};
export default Navbar;
