/**
 * importing the requirements 
 */
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function userRegister(firstName, lastName, email, password) {
/**
 * fetching registration data and sending request to backend
 */
    return axios.post('/registration',{
        
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
    }

/**
 * fetching login data and sending request to backend
 */
function userLogin(email, password) {
    return axios.post('/login',
        {
            email: email,
            password: password
        })
  
}
/**
 * fetching data and sending request to backend
 */
function forgot(email) {
    axios.post('/verifyUser',
        {
            email: email
        })
        .then(function (response) {
            console.log('Inside forgetPassword response is--', response.data);
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
/**
 * fetching data and sending request to backend
 */
function reset(password, token) {

    return axios.post(`/resetpassword/${token}`, { 'password': password }, {
        headers: {
            'token': token
        }
    })
}
/**
 * exporting the all data 
 */
export {
    userRegister,
    userLogin,
    forgot,
    reset
}
