
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function userRegister(firstName,lastName,email,password){
    axios.post('/registration',
    {
       firstName:firstName,
       lastName:lastName,
       email:email,
       password:password
    })
    .then(function(response)
    {
        console.log(response);
        toast("Registered Successfully!!");
        window.location.href='/loginPage';

    })
    .catch(function(err)
    {
        console.log(err);
        toast("User with email id already exists!!");
    })
}

function userLogin(email,password){
    axios.post('/login',
    {
          email:email,
        password:password
    })
    .then(function(response)
    {
     
        console.log(response);
        toast("Login Successfully!!");
        window.location.href='/dashboardPage';

    })
    .catch(function(err)
    {
        console.log(err);
        toast("Login unsuccessful!!");
    });
}

export{
    userRegister,
    userLogin
}
