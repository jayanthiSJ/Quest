import React from 'react';
import './reactlandingpage.css';
import Defaultimg from './../../images/default_profile.jpg';
import Logo from './../../images/QandA.jpg';
import Tabs from './tabs.js';
import Navbar from './navbar.js';
import {Link,Redirect} from 'react-router-dom';

class Reactlandingpage extends React.Component {

  constructor(props) {
      super(props);
    };

render(){
  return(
    <div >
      <Navbar/>
      <Tabs/>
  </div>

)};
};
export default Reactlandingpage;
