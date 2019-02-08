const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,require:[true,"firstName require"]
    },
    lastName: {
        type: String,require:[true,"second require"]
    },
    email: {
        type: String,require:[true,"email require"]
    },
    password: {
        type: String,require:[true,"password require"]
    },
}, {
    timestamps: true
});

function userModel() {}
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
module.exports = new userModel();