import React, { Component } from 'react';
import '../App.css';
import Register from "../components/register";

class RegisterPage extends Component {
    render() {
        return (
            <div className="form">
                <Register props={this.props} />
            </div>
        );
    }
}
export default RegisterPage;