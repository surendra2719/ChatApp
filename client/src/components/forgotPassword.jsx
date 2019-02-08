
import React from "react";
import '../App.css';
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

class forgotPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recoveryEmail: null,
            formErrors: {
    
            recoveryEmail: "",
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(`
        --SUBMITTING-
     Recoveryemail ${this.state.recoveryEmail}
      `);
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
                      case "Recoveryemail":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };
    registrationclick=e=>{
        e.preventDefault();
        window.location.href="registerPage"
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
                                className={formErrors.recoveryEmail.length > 0 ? "error" : null}
                                placeholder="Email"
                                type="email"
                                name="email"
                             noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.recoveryEmail.length > 0 && (
                                <span className="errorMessage">{formErrors.email}</span>
                            )}
                        </div>
                        <div className="createAccount">
                            <button type="submit" title="click on Submit">submit</button>
                        </div>
                        <div className="login">
                            <button      class="registerButton" type="submit" title="click on Login"
                            onClick={this.registrationclick}>
                            register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default forgotPassword; 