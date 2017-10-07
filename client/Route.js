import React, { Component } from 'react';
import {render} from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
import Landingpage from './components/Landingpage/landingpage';
import IndividualQuestion from './components/ReactLandingpage/individualquestion.js';
import Editor from './components/ReactLandingpage/texteditor.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';

injectTapEventPlugin();

render(
  <MuiThemeProvider>
    <Router>
     <div >
     <Route exact path="/" component={Landingpage} />
     <Route path="/editor" component={Editor} />
     </div>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
