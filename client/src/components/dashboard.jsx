import React from "react";
import '../App.css';
//import TextField from '@material-ui/core/TextField';
import { TextField, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { chatServices, chatDisplay, userChatArray } from "../services/chatservices";
import MessageDisplay from './messagedisplay';


export default class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            onlineUser: [],
            MsgArray: [],
            message: "",
            MsgDisplay: "",
            Receiver: '',
            Sender: ''
        }
    }
    componentDidMount() {
        //Get all the users data
        chatServices()
            .then((result) => {
                this.setState({
                    onlineUser: result.data.result
                })
                console.log("users", result.data.result);
            })
            .catch((error) => {
                alert(error)
            });

        //Get all users chat history to display    
        userChatArray()
            .then((result) => {
                this.setState({
                    MsgArray: result.data.result
                })
                console.log("chat history is :", this.state.MsgArray);
            })
            .catch((error) => {
                alert(error)
            });
    }
    handleMessage = (e) => {
        this.setState({ message: e.target.value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        //Get the sender who has login to the application
        const Sender = localStorage.getItem('Sender')
        this.setState({ Sender: Sender })
        console.log('Sender is :',Sender);
        console.log("Selected receiver: ", this.state.Receiver);
        chatDisplay(Sender, this.state.Receiver, this.state.message);
        this.setState({
            message: '',
            anchorEl: null
        });
        this.setState({ MsgDisplay: this.state.message })
        this.handleClick = this.handleClick.bind(this);
    }

    handlelogout = event => {
        event.preventDefault();
        this.props.props.history.push('/loginPage');
    }
    handleClick = (key, event) => {
        this.setState({ anchorEl: null });
        let Receiver = event.target.textContent;
        this.setState({ Receiver: Receiver });

    };
    render() {
        console.log('Sender is :', this.state.Sender);
        console.log("Selected receiver: ", this.state.Receiver);
        const loginUsers = this.state.onlineUser.map((key) => {
            console.log("  local data ", localStorage.getItem('Sender'));

            if (key.email !== localStorage.getItem('Sender')) {
                return (
                    <MenuItem onClick={(event) => this.handleClick(key, event)}>{key.email}</MenuItem>
                )
            }
            else {
                return true;

            };
        });
        return (

            <div>
                <div className="root">
                    <AppBar position="static">
                        <h1 id="heading">chatapp </h1>
                        <Button id="buttonalter" onClick={this.handlelogout} color="inherit"
                        >Logout</Button>
                       <p id="loginas">login as  {localStorage.getItem("Sender")}</p>
                   </AppBar>
                </div >
             
                <div className="div1">
                    <label>users</label>
                    <div>{loginUsers}</div>
                </div>
                <div className="div2" >
                       {this.state.Receiver}
                    <MessageDisplay
                        MsgArray={this.state.MsgArray}
                        recieverId={this.state.Receiver} />


                </div>

                <div>
                    <form className="container" >
                        <TextField
                            id=" textfieldInput"
                            className="textField"
                            margin="normal"
                            value={this.state.message}
                            onChange={this.handleMessage}></TextField>
                    </form>
                </div>
                <div>
                    <Button variant="contained" color="primary" id="dashsendButton">

                        {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                        <Icon class="senddashlabel" onClick={this.handleSubmit}>send</Icon>
                    </Button>
                </div>
            </div>
        );
    }
}

