
import React from "react";
import '../App.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../pages/loginPage";
import {userLogin} from "../services/userServices";
class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
            formErrors: {
                email: "",
                password: ""
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
          userLogin(this.state.email,this.state.password)
          .then((res)=>{
              console.log("login  responce ",res);
              localStorage.setItem('Sender',this.state.email)
              this.props.props.history.push("/dashboard")
          })
          .catch(function(err)
           {
               console.log(err);
             toast("Login unsuccessful!!");
          });
        
        } else {
            toast("please enter all the feilds correctly", {
                position: toast.POSITION.BOTTOM_CENTER
            });
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
            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            default:
                break;
        }

       this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };
   registrationclick=e=>{
     e.preventDefault();
     this.props.props.history.push("/register");
   };
   Onclick=e=>{
    e.preventDefault();
 this.props.props.history.push("/forgetPassword")
  };
    render() {
        const { formErrors } = this.state;

        return (
            <div className="wrapper" >
                <div className="form-wrapper">
                       <h1>Login</h1>
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
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input
                                className={formErrors.password.length > 0 ? "error" : null}
                                placeholder="Password"
                                type="password"
                                name="password"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.password.length > 0 && (
                                <span className="errorMessage">{formErrors.password}</span>
                            )}
                        </div>

                        <div className="createAccount">
                            <button type="submit"
                             onClick={this.handleSubmit}>submit</button>
                        </div>
                        <div>
                            <button  class="button1"
                           onClick={this.registrationclick}>
                               registration
                            </button>
                        </div>
                        <div>
                     
                        </div>
                    </form>
                    <small> 
                          <a
                          onClick={this.Onclick} href="forgotpassword"> forgot password</a>
                        </small>
                </div>
                < ToastContainer/>
            </div>
        );
    }
}
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
export {LoginPage};
export default LoginPage;