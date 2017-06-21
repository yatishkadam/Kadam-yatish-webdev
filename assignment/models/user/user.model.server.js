var mongoose = require('mongoose');
var userSchema = require("./user.schema.server");
var userModel= mongoose.model("userModel",userSchema);
var bcrypt = require("bcrypt-nodejs");

userModel.createUser=createUser;
userModel.findUserById=findUserById;
userModel.findAllUser=findAllUser;
userModel.findUserByUsername=findUserByUsername;
userModel.findUserByCredentials=findUserByCredentials;
userModel.updateUser=updateUser;
userModel.deleteUser=deleteUser;
userModel.addWebsite=addWebsite;
userModel.deleteWebsiteUser=deleteWebsiteUser;
userModel.findUserByGoogleId=findUserByGoogleId;
module.exports= userModel;

// crud and few other functions that can be performed on the database
//create user
function createUser(user) {
    return userModel.create(user);
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id':googleId});
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
    return userModel.findOne({username: username})
        .select('password')
        .then(
            function (user) {

                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        user.password = null;
                        return user;
                    }
                }
                return null;
            }
        );
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

//add websites
function addWebsite(userId,websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

//delete the website after deleteing the website
function deleteWebsiteUser(userId,websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index= user.websites.indexOf(websiteId);
            user.websites.splice(index,1);
            return user.save();
        });
}