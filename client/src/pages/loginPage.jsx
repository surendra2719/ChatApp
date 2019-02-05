import React, { Component } from 'react';
import '../App.css';
import Login from '../components/login';

class Loginpage extends Component {

constructor(props) {
super(props);
this.state = {
username: '',
password: ''
}
}
render() {
return (
<div className= "container">

    <Login />
</div>
);
}
}
export default Loginpage;