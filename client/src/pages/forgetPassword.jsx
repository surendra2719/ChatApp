import React, { Component } from 'react';
import '../App.css';
import ForgotPassword from "../components/forgotPassword"
class forgotPage extends Component {
    render() {
        return (
            <div className="container">

                <ForgotPassword props={this.props}/>
</div>
        );
    }
}
export default forgotPage;