import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css"
import loginPage from '../src/pages/loginPage';
import registerPage from "../src/pages/registerPage";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="app">
        
            <Route path="/loginpage" component={loginPage}></Route>
            <Route path="/registerPage" component={registerPage}></Route>
          </div>
        </Router> 
      </div>

    );
  }
}
export default App;