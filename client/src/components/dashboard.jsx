import React from "react";
import '../App.css';
import "../pages/dashboardPage";
class DashboardPage extends React.Component {
  
    constructor() {
      super()
      this.state = {
         messages: []
      }
    }
    
    render() {
      return (
        <div>
            <h1>Chat App</h1>
       </div>
      )
    }
  }
  export default DashboardPage;