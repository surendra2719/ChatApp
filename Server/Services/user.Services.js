
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
