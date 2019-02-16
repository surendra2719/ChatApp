
import React from "react";
import '../App.css';
import { reset } from '../services/userServices';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
class ResetPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: null,
            conformpassword: null,
            formErrors: {
                password: "",
                conformpassword: ""
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        let current_url = window.location.pathname;
        let verify_user_token = current_url.substr(15);

        console.log("resetpassComponent--Current url is--:", current_url);
        console.log("resetpassComponent--Token is--:", verify_user_token);
        reset(this.state.password, verify_user_token)
            .then((res) => {
                this.props.props.history.push("/login");
            })
            .catch((err) => {
                toast("plz try again")
            })

    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        switch (name) {
            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            case "password1":
                formErrors.conformpassword =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };
    Onclick = e => {
        e.preventDefault();

    };
    render() {
        const { formErrors } = this.state;

        return (
            <div className="wrapper" >
                <div className="form-wrapperRecover">
                    <h1>Reset</h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="password">
                            <label htmlFor="password">new password</label>
                            <input
                                className={formErrors.password.length > 0 ? "error" : null}
                                placeholder="password"
                                type="password"
                                name="password"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.password.length > 0 && (
                                <span className="errorMessage">{formErrors.password}</span>
                            )}
                        </div>
                        <div className="password">
                            <label htmlFor="password">conform passowrd</label>
                            <input
                                className={formErrors.conformpassword.length > 0 ? "error" : null}
                                placeholder="Password"
                                type="password"
                                name="password1"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.conformpassword.length > 0 && (
                                <span className="errorMessage">{formErrors.conformpassword}</span>
                            )}
                        </div>
                        <div className="createAccount">
                            <button type="submit"
                                onClick={this.handleSubmit}>submit</button>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

export { reset }
export default ResetPassword;
