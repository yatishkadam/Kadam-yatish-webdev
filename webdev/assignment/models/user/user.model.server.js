var mongoose = require('mongoose');
var userSchema = require("./user.schema.server");
var userModel= mongoose.model("userModel",userSchema);

userModel.createUser=createUser;
userModel.findUserById=findUserById;
userModel.findAllUser=findAllUser;
userModel.findUserByUsername=findUserByUsername;
userModel.findUserByCredentials=findUserByCredentials;
userModel.updateUser=updateUser;
userModel.deleteUser=deleteUser;
module.exports= userModel;

// crud and few other functions that can be performed on the database
//create user
function createUser(user) {
    return userModel.create(user);
}

//find a particular user
function findUserById(userId) {
    return userModel.findById(userId);
}

//get all the user
function findAllUser() {
    return userModel.find();
}

// get a user by the given username
function findUserByUsername(username) {
    return userModel.findOne({username:username});
}

//get the user by credentials
function findUserByCredentials(username,password) {
    return userModel.findOne({username:username,password:password});
}

// update user
function updateUser(userId,newUser) {
    delete newUser.username;
    delete newUser.password;
    return userModel.update({_id:userId},{$set:newUser});
}


//delete user
function deleteUser(userId) {
    return userModel.remove({_id:userId});
}