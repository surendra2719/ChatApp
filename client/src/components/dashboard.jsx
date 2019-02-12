import React from "react";
import '../App.css';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
class DashboardPage extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }
  }
handlelogout=event=>{
event.preventDefault();
this.props.props.history.push('/loginPage');

}
  render() {
    return (
    
        <div>
        <div className="root">
          <AppBar position="static">
            <h1 id="heading">chatapp </h1>
            <Button id="buttonalter" onClick={this.handlelogout} color="inherit"
              >Logout</Button>
          </AppBar>
        </div >
        <div className="div1">
          <label>online users</label>
        </div>
        <div className="div2" >
          
        </div>
        <div>
        <form className="container" >
        <TextField
       
          id=" textfieldInput"
          className="textField"
          margin="normal"></TextField>
        </form>

        </div>
        </div>
  

    );
  }
}
export default DashboardPage;
