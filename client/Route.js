import React, { Component } from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Landingpage from './components/Landingpage/landingpage';
import IndividualQuestion from './components/ReactLandingpage/individualquestion.js';
import Reactlandingpage from './components/ReactLandingpage/reactlandingpage';
import Editor from './components/ReactLandingpage/texteditor.js';
import Signup from './components/Signup.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';

injectTapEventPlugin();

render(
  <MuiThemeProvider>
    <Router>
     <div >
    <Route path="/individualquestion" component={IndividualQuestion}/>
     <Route exact path="/" component={Landingpage} />
     <Route path="/home" component={Reactlandingpage} />
     <Route path="/editor" component={Editor} />
     </div>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
