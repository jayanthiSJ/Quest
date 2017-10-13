import React from 'react';
import './reactlandingpage.css';
import '../Landingpage/landingpage.css';
//import Defaultimg from './../../images/default_profile.jpg';
import Logo from './../../images/QandA.jpg';
import Tabs from './tabs.js';
import Navbar from '../Landingpage/navbar.js';
import {Link,Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Reactlandingpage extends React.Component {

  constructor(props) {
      super(props);
    };


render(){
  return(
    <div >
    <div className="navs">
        <Navbar style={{marginTop:'-15%'}}/>
    </div>
    <div className="tabs">
        <Tabs style={{marginTop:'15%'}}/>
    </div>
    <hr/>
    <hr/>
    <hr style={{height:'2%',backgroundColor:'black'}}/>
    <div className="container-fluid" >
      <div className="footer-block footer1" style={{backgroundColor:'#00BCD4',padding:'2%'}}>
  <div className="container  copyRights">
    <ul className="list-inline bullets">
                        <li><i className="fa fa-facebook faf fa-lg"></i></li>
                        <li><i className="fa fa-twitter fat fa-lg"></i></li>
                        <li><i className="fa fa-instagram  fai fa-lg"></i></li>
                        <li><i className="fa fa-youtube fay fa-lg"></i></li>

                       <p class="pull-right">Copyright 2017 © Quoser Pvt. Ltd.</p>
                      </ul>

  </div>
 </div>
    </div>
    </div>

)};
};
export default Reactlandingpage;
