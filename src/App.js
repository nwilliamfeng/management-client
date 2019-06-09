import React from 'react';
import logo from './logo.svg';
import './App.css';
import { history } from './util';
import { Login , LoginRoute } from './components/auth';
import {  Router, Route, } from 'react-router-dom';
import { Shell } from './components';

function App() {
  return (
    <div className="App">
       <Router history={history}>
              <div>
                <LoginRoute exact path="/" component={Shell} />
                <Route path="/login" component={Login } />
              </div>
            </Router>    
    </div>
  );
}

export default App;
