const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UserSchema = mongoose.Schema({
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    },
}, {
    timestamps: true
});

function userModel() {}
var user = mongoose.model('user', UserSchema);
function hash(Password) {
    var hash = bcrypt.hashSync(Password, saltRounds);
    return hash;
}
userModel.prototype.registration = (body, callback) => {
    user.find({
        "Email": body.Email
    }, (err, data) => {
        if (err) {
            console.log("Error in registration");
            callback(err);
        } else if (data.length > 0) {
            console.log("Email already exists");
            callback("User already present")
        } else {
            const newUser = new user({
                "FirstName": body.FirstName,
                "LastName": body.LastName,
                "Email": body.Email,
                "Password": hash(body.Password)
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
        "Email": body.Email
    }, (err, data) => {
        // console.log(data);
        if (err) {
            callback(err);
        } else if (data != null) {
             //console.log(data);
            bcrypt.compare(body.Password, data.Password).then(function (res) {
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
module.exports = new userModel();