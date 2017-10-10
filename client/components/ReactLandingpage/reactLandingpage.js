import React from 'react';
import './reactlandingpage.css';
import '../Landingpage/landingpage.css';
import Defaultimg from './../../images/default_profile.jpg';
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
    </div>

)};
};
export default Reactlandingpage;
