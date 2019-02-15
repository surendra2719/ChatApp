const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UserSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },

}, {
        timestamps: true
    });

function userModel() { }
var user = mongoose.model('user', UserSchema);
function hash(password) {
    var hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}
userModel.prototype.registration = (body, callback) => {
    user.find({
        "email": body.email
    }, (err, data) => {
        if (err) {
            console.log("Error in registration");
            callback(err);
        } else if (data.length > 0) {
            console.log("Email already exists");
            callback("User already present")
        } else {
            const newUser = new user({
                "firstName": body.firstName,
                "lastName": body.lastName,
                "email": body.email,
                "password": hash(body.password)
            });
            newUser.save((err, result) => {
                if (err) {
                    console.log("Model not found");
                    callback(err);
                } else {
                    console.log("Registered Successfully");
                    callback(null, result);
                }
            })
        }
    });
}
userModel.prototype.login = (body, callback) => {
    user.findOne({
        "email": body.email
    }, (err, data) => {
        // console.log(data);
        if (err) {
            callback(err);
        } else if (data != null) {
            //console.log(data);
            bcrypt.compare(body.password, data.password).then(function (res) {
                if (res) {
                    console.log("login succesfully");
                    callback(null, res);
                } else {
                    console.log("Incorrect password");
                    callback("Incorrect password");
                }
            });
        } else {
            console.log("Invalid user");
            callback("invalid user");
        }
    })

}
userModel.prototype.findUserEmail = (data, callback) => {
    user.findOne({ "email": data.email }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            if (result !== null && data.email == result.email) {
                callback(null, result);
            }
            else {
                callback("incorect mail")
            }
        }
    });
}
userModel.prototype.updateUserPassword = (req, callback) => {
    console.log(' in model--data:--', req.decoded);
    console.log(' in model--body:--', req.body);
    let newpassword = bcrypt.hashSync(req.body.password, saltRounds);
    console.log('new pass bcrypt--', newpassword);
    user.updateOne({ _id: req.decoded.payload.user_id }, { password: newpassword }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null, result);
        }
    });
}
userModel.prototype.confirmUser = (data, callback) => {
    user.updateOne({ _id: data.payload.id }, { is_verified: true }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null, result);
        }
    });
}
userModel.prototype.getAllUsers = (callback) => {
    user.find({}, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null, result);
        }
    });
}
module.exports = new userModel();