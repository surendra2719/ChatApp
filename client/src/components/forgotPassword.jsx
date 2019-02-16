
import React from "react";
import '../App.css';
import { forgot } from "../services/userServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

class forgetPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            formErrors: {
                email: "",
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {

            forgot(this.state.email);
            console.log(`
        --SUBMITTING-
    email ${this.state.email}
      `);
        } else {
            toast("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };
    registrationclick = e => {
        e.preventDefault();
        window.location.href = "register"
    };

    render() {
        const { formErrors } = this.state;
        return (
            <div className="wrapper">
                <div className="form-wrapperRecover">
                    <h1>Forget Password</h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input
                                className={formErrors.email.length > 0 ? "error" : null}
                                placeholder="Email"
                                type="email"
                                name="email"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.email.length > 0 && (
                                <span className="errorMessage">{formErrors.email}</span>
                            )}
                        </div>
                        <div className="createAccount">
                            <button type="submit" title="click on Submit" onClick={this.handleSubmit}>submit</button>

                        </div>
                        <div className="login">
                            <button class="registerButton" type="submit" title="click on Login"
                                onClick={this.registrationclick}>
                                register
                            </button>
                        </div>
                    </form>
                </div>
                < ToastContainer />
            </div>
        );
    }
}
export { forgot }
export default forgetPassword; 