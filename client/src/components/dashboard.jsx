import React from "react";
import '../App.css';
//import TextField from '@material-ui/core/TextField';
import { TextField, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { chatServices, chatDisplay, userChatArray } from "../services/chatservices";
import MessageDisplay from './messagedisplay';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000')


export default class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            onlineUser: [],
            MsgArray: [],
            message: "",
            MsgDisplay: "",
            Receiver: '',
            Sender: '',
            msg: [],
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
            const Sender = localStorage.getItem('Sender')
            socket.on(Sender, (result) => {
                console.log("recieved data to services-->", result);

                const msg=this.state.msg;
                msg.push(result);
                this.setState({msg:msg});
                console.log("this dot msg==========>",result);
                console.log("msg array=======>",this.state.msg);
                
            })
    
    
    }
    handleMessage = (e) => {
        this.setState({ message: e.target.value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        //Get the sender who has login to the application
        const Sender = localStorage.getItem('Sender')
        this.setState({ Sender: Sender })
        console.log('Sender is :', Sender);
        console.log("Selected receiver: ", this.state.Receiver);




        //  chatDisplay(Sender, this.state.Receiver, this.state.message);

        let request = {
            senderId: Sender,
            recieverId:this.state. Receiver,
            message: this.state.message,
        }
        socket.emit("new_msg", request);
       

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

const msg=this.state.msg.map((key)=>{

return(

<div> 

<MenuItem>{key.senderId}:{ key.message  }   </MenuItem>

</div>

)


})









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
                    {msg}
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
