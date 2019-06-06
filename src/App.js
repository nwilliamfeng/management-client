import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login , LoginRoute } from './components/auth';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import { Shell } from './components';

function App() {
  return (
    <div className="App">
       <Router >
              <div>
                <LoginRoute exact path="/" component={Shell} />
                <Route path="/login" component={Login } />
              </div>
            </Router>    
      {/* <Shell/> */}
    </div>
  );
}

export default App;
