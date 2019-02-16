const jwt = require('jsonwebtoken');
module.exports = {
    GenerateToken(payload)
    {
        const token =  jwt.sign({payload}, 'secretkey', { expiresIn: 1440 })
        const obj = {        
            success: true,
            message: 'Token Generated Successfully!!',
            token: token
        }
        return obj;
    }
}