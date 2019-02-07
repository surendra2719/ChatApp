
const userService=require('../Services/user.Services');

exports.registration=(req,res)=>{
    var responseResult={};
    userService.registration(req.body,(err,result)=>{
        if(err){
            responseResult.success=false;
            responseResult.error=err;
            res.status(500).send(responseResult);
        }
        else{
            responseResult.success=true;
            responseResult.result=result;
            res.status(200).send(responseResult)
        }
    }
    )

}

exports.login=(req,res)=>{
    var responseResult={};
    userService.login(req.body,(err,result)=>{
        if(err){
            responseResult.success=false;
            responseResult.error=err;
            res.status(500).send(responseResult);
        }
        else{
            responseResult.success=true;
            responseResult.result=result;
            res.status(200).send(responseResult)
        }
    }
    )
}
