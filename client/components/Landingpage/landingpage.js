import React from 'react';
import {Card, CardActions, CardTitle, CardText,CardMedia,CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {Redirect} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import {indigo200,blue200,lightBlue200,cyan200,lightBlue400,blue400,tealA200} from 'material-ui/styles/colors.js';
import RaisedButton from 'material-ui/RaisedButton';
import Cookies from 'universal-cookie';
import Reactimg from './../../images/react2.jpg';
import Nodeimg from './../../images/node1.jpg';
import Mongoimg from './../../images/mongodb.jpg';
import Expressimg from './../../images/express.jpg';
import Neo4jimg from './../../images/neo4j.jpg';
import Angularimg from './../../images/angular.jpg';
import './landingpage.css';
import Navbar from './navbar.js';
import Navbar1 from '../ReactLandingpage/navbar.js';
import Tabs from '../ReactLandingpage/tabs.js';
import $ from 'jquery';




const cookies = new Cookies();
const styles = {
  frontcardtitle:{
    fontSize:'25%',
    fontWeight:'bold'
  },
  frontcard: {
    width: '70%',
    height: '70%',
    textAlign: 'center',
    padding: '20px',
    borderTopLeftRadius:'30%',
    borderBottomRightRadius:'30%',
    fontFamily: 'Times New Roman'
  },
  frontcardmedia:{
    width:'60%',
    height:'90%',
    paddingTop: '20%',
    textAlign:'center',
    marginLeft:'20%'
  },
  backcardtitle:{
    fontSize:'20%',
    fontWeight:'normal',
    margingBottom:'-15%',
    fontStyle: 'italic',
    textAlign: 'justify'
  },
  raisedbtn:{
    width:'50%',
    height:'20%',
    fontSize:'30%',
    color:'white',
    fontStyle: 'oblique'
  },
  backcardheader:{
    fontSize:'140%',
    fontWeight:'bold',
    marginTop:'8%',
    fontStyle: 'oblique'
  },
  avatar:{
    width:'25%',
    height:'25%',
    marginTop:'-15%',
    //border:'5px solid transparent',
    borderColor:'white'
  },
  recentquestion:{
    marginTop:'-20%'
  },
  timestamp:{
    textDecorationLine: 'none',
    marginTop:'-8%'
  },
  backtable:{
    marginBottom:'0%',
    height:'2%'
  }
};


class Landingpage extends React.Component {
  constructor() {
    super();
    this.state = {
      username:'',
      visitSite:false,
      loginStatus:false,
      react:'React is a declarative, efficient, and flexible JavaScript library for building user interfaces.',
      colorReact : indigo200,
      mongo:'MongoDB is an open source, document-oriented database designed with both scalability and developer agility in mind.',
      colorMongo : blue200,
      node:'Node.js is a platform built on Chromes JavaScript runtime for easily building fast and scalable network applications.',
      colorNode : lightBlue200,
      express:'Express.js is a Node.js framework.',
      colorExpress : cyan200,
      angular:'AngularJS is a structural framework for dynamic web apps.',
      colorAngular : lightBlue400,
      neo4j:'Neo4j is a graph database management system developed by Neo4j, Inc. ',
      colorNeo4j : tealA200,
       value: 1
    }
  };

  componentWillMount(){

  }

  /*changeNavbar(loginStatus){
    alert("inside navbar");
    alert(loginStatus.loginStatus);
    if(loginStatus.loginStatus){
      alert("inside if");
      this.setState({loginStatus:true});
    }
    alert(this.state.loginStatus);
  }
/*ajax call for home page*/
  visitSite()
 {
     this.setState({visitSite:true});
  }


  render(){
    const cardData = [
      {
        img: Reactimg,
        title: "React JS",
        definition:this.state.react,
        color:this.state.colorReact
      },
      {
        img: Mongoimg,
        title: "MongoDB",
        definition:this.state.mongo,
        color:this.state.colorMongo
      },
      {
        img: Nodeimg,
        title: "Node JS",
        definition:this.state.node,
        color:this.state.colorNode
      },
      {
        img: Expressimg,
        title: "Express JS",
        definition:this.state.express,
        color:this.state.colorExpress
      },
      {
        img: Angularimg,
        title: "Angular JS",
        definition:this.state.angular,
        color:this.state.colorAngular
      },
      {
        img: Neo4jimg,
        title: "Neo4j",
        definition:this.state.neo4j,
        color:this.state.colorNeo4j
      }
    ];

  return(
  <div >
  <div className="navs">
   <Navbar/>
 </div>
   <hr/>
   {this.state.visitSite?<Tabs/>:
   <div className="bg-image container-fluid">
      <div className="row cards">
         {cardData.map((data,index) => (
         <div className="col-sm-4 domain" key={index}>
            <div className="flip-container" >
               <div className="flipper">
                  <div className="front">
                     <Card style={styles.frontcard} >
                        <CardText style={styles.frontcardtitle}>{data.title}</CardText>
                        <CardMedia style={styles.frontcardmedia}>
                           <img className="reactimg" src={data.img} alt="" />
                        </CardMedia>
                     </Card>
                  </div>
                  <div className="back">
                     <Card style={{backgroundColor:data.color,width: '90%',height: '80%',textAlign: 'center',margin:'2%',fontFamily: 'Times New Roman',borderBottomLeftRadius:'20%',borderTopRightRadius:'20%'}}>
                        <CardHeader
                           avatar={<Avatar style={styles.avatar} src={data.img}/>}
                           title={<CardText style={styles.backcardheader}>{data.title}</CardText>}
                           />
                        <CardActions style={styles.recentquestion}>
                          {<CardText style={styles.backcardtitle} >
                             {data.definition}</CardText>}
                        </CardActions>

                        <RaisedButton  style={styles.raisedbtn} secondary={true} onClick={this.visitSite.bind(this)}>Visit site</RaisedButton>
                     </Card>
                  </div>
               </div>
            </div>
         </div>
       ))}
      </div>
   </div>}
   <div className="copyright">
    <center>
      <p>
         <b>
            <i>
      Copyright © 2017. All Rights Reserved.</i></b></p></center>
   </div>
</div>

)};
};

export default Landingpage;
