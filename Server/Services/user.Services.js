
const userModel=require('../Apllication/Model/user.Model')
exports.login=(data,callback)=>{
    userModel.login(data,(err,result)=>{
        if(err){
            callback(err);
        }
            else{
            callback(null,result);
        }    
    }
    )
}
exports.registration=(data,callback)=>{
    userModel.registration(data,(err,result)=>{
        if(err){
            console.log("service error");
            callback(err);
        }
            else{
                console.log("In service",result);
                callback(null,result);
            }    
    }
    )
}
exports.redirect = (decoded, callback) => 
{
    userModel.confirmUser(decoded, (err, result) => {
        if (err) {     
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
exports.getUserEmail = (data, callback) => 
{
    userModel.findUserEmail(data, (err, result) => 
    {     
        if (err) {     
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
exports.resetPass = (req, callback) => 
{  
    userModel.updateUserPassword(req, (err, result) => {
        if (err) {     
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
exports.getAllUsers=(data,callback)=>{
    userModel.getAllUsers(data,(err,result)=>{
        if(err){
            callback(err);
        }
            else{
            callback(null,result);
        }    
    }
    )
}

