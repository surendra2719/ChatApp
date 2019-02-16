import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css"
import loginPage from '../src/pages/loginPage';
import registerPage from "../src/pages/registerPage";
import dashboardPage from './pages/dashboardPage';
import forgetPassword from "../src/pages/forgetPassword";
import resetPassword from '../src/pages/resetPassword';
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="app">
            <Route path="/login" component={loginPage}></Route>
            <Route path="/register" component={registerPage}></Route>
            <Route path="/dashboard" component={dashboardPage}></Route>
            <Route path="/forgetPassword" component={forgetPassword}></Route>
            <Route path="/resetPassword" component={resetPassword}></Route>

          </div>
        </Router>
      </div>

    );
  }
}
export default App;