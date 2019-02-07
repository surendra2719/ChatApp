import React, { Component } from 'react';
import '../App.css';
import Dashboard from "../components/dashboard";
import AppBar from '@material-ui/core/AppBar';


class Dashboardpage  extends Component {
render() {
return (
<div className= "form">
<AppBar class="appbar" position="static">WELCOME TO CHATAPP

    </AppBar>
        
    <Dashboard />
 
</div>
);
}
}
export default Dashboardpage;