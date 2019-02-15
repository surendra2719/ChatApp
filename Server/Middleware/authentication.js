/**
 * define the jwt by jwt varaible
 */
var jwt = require('jsonwebtoken');
/**
 * exporting the login authentacation passing parameters as request response and next it will acesse controllers to call back functions  
 */
exports.loginAuth = (req, res, next) => {
    if (req.body !== null) {
        /**
         * checking the mail  present in database or not through if condition by body 
         */
        if (req.body.email == null || req.body.password == null) {
            res.send({
                status: false,
                message: 'Empty request'
            })
        }
        /**
         * checking the mail with regax expression ans send response
         */
        else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(req.body.email)) {
            res.send({
                status: false,
                message: 'Invalid Email Id'
            })
        }  
         /** 
        * checking the mail through with validate by empty and length
        */
        else if (req.body.password === '' || req.body.password.length < 6) {
            res.send({
                status: false,
                message: 'Invalid Password'
            })
        }
        /**
         * checking the mailand pass to client to controller by next
         */
        console.log('\nPassing client request to controller...');
        next();
    }
    else {   /**
        * checking the mail and send the error message
        */
        res.send({
            status: false,
            message: "Authentication error..."
        })
    }
}
   /**
  * checking the generated token passing the parameters as request response next by call back function 
         */
exports.checkToken = (req, res, next) => {
    var token1 = req.headers['token'];
    /**
     *decode token  
     */ 
    if (token1) {
        /**
         * verifies secret and checks exp 
         */ 
        jwt.verify(token1, 'secretkey', (err, decoded) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Token is not valid'
                });
            }
            /**
             * req decoded and next will pass the controllers 
             */
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        /**
         *  if there is no token return an error
         */
        return res.send({
            success: false,
            message: 'No token provided.'
        });
    }
}
