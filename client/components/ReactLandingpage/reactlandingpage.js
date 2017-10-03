import React from 'react';
import './reactlandingpage.css';
import Defaultimg from './../../images/default_profile.jpg';
import Logo from './../../images/QandA.jpg';
import Tabs from './tabs.js';
import Navbar from '../Landingpage/navbar.js';
import Navbar1 from './navbar.js';
import {Link,Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Reactlandingpage extends React.Component {

  constructor(props) {
      super(props);
      this.state={
        logStatus:false,
        username:''
      }
    };
    componentWillMount(){
      if((cookies.get('username')) != " "){
        this.setState({logStatus:true});
      }
      console.log(this.state.logStatus);
    }

render(){
  return(
    <div >
      {this.state.logStatus?<Navbar1/>:<Navbar/>}
  </div>

)};
};
export default Reactlandingpage;
