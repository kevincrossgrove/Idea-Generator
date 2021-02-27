import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './css/App.css';
import MainNavbar from './components/MainNavbar';

// Page imports
import Landing from './pages/Landing';
import About from './pages/About';
import ManageIdeas from './pages/ManageIdeas';
import SubmitIdeas from './pages/SubmitIdeas';

function App() {

  return (
    <Router>
      <MainNavbar/>
      <Switch>
        <Route path="/" exact component={Landing}/>
        <Route path="/SubmitIdeas" component={SubmitIdeas}/>
        <Route path="/About" component={About}/>
        <Route path="/ManageIdeas" component={ManageIdeas}/>
      </Switch>
    </Router>
  );
}

export default App;
