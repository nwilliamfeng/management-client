import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginPage, LoginRoute } from './components/auth';
import { Router, Route, } from 'react-router-dom';
import { Shell } from './components';

function App() {
  return (
    <div className="App">
       <Router >
              <div>
                <LoginRoute exact path="/" component={Shell} />
                <Route path="/login" component={LoginPage} />
              </div>
            </Router>    
      {/* <Shell/> */}
    </div>
  );
}

export default App;
