
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function userRegister(firstName,lastName,email,password){
  return  axios.post('/registration',
    {
       firstName:firstName,
       lastName:lastName,
       email:email,
       password:password
    })
    // .then(function(response)
    // {
    //     console.log(response);
    //     toast("Registered Successfully!!");
    //     window.location.href='/loginPage';

    // })
    // .catch(function(err)
    // {
    //     console.log(err);
    //     toast("User with email id already exists!!");
    // })
}

function userLogin(email,password){
    return axios.post('/login',
    {
          email:email,
        password:password
    })
    // .then(function(response)
    // {
     
    //     console.log(response);
    //     toast("Login Successfully!!");
    //     window.location.href='/dashboardPage';

    // })
    // .catch(function(err)
    // {
    //     console.log(err);
    //     toast("Login unsuccessful!!");
    // });
}
function forgot(email) {
    axios.post('/verifyUser',
    {
        email:email
    })
    .then(function (response) {
        console.log('Inside forgetPassword response is--',response.data);
        const token1 = response.data;
        const token2 = token1.substring(34)
        localStorage.setItem('verifyUserToken', token2);
        toast(' plz check your email..')
    })
    .catch(function (err) {
        console.log(err);
        toast('User Not Found..');
    });
}

function reset(password,token) {
    console.log('inside reset paswd password--',password);
    console.log('inside reset paswd token--',token);
    
 return  axios.post(`/resetpassword/${token}`,{'password': password},{
     headers: {
        'token': token
    }})
    // .then(function (response) {
    //     console.log (response)
    //     toast('Password changed successfully');
    //         window.location.href = '/loginPage'
    // })
    // .catch(function (err) {
    //     console.log(err);
    //     toast('Please Try Again..');
    // });
}



export{
    userRegister,
    userLogin,
    forgot,
    reset
}
