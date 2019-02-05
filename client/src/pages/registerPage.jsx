import React, { Component } from 'react';
import '../App.css';
import Register from "../components/register";

class RegisterPage extends Component {

constructor(props) {
super(props);
this.state = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}
}
render() {
return (
<div className= "form">

    <Register />
</div>
);
}
}
export default RegisterPage;