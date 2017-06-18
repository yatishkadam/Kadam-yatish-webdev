var app=require('../../express');
var passport = require('passport');
var LocalStrategy= require('passport-local').Strategy;

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var userModel = require("../../assignment/models/user/user.model.server");


app.get    ("/api/user",findAllUsers);
app.post   ("/api/user",createUser);
app.put    ("/api/user/:userId",updateUser);
app.get    ("/api/user/:userId",findUserById);
app.delete ("/api/user/:userId",deleteUser);
app.get    ("/api/loggedin",loggedin);
app.post   ("/api/logout",logout);
app.post   ("/api/user/login", passport.authenticate('local'),login);
app.post   ("/api/register",register);


function register(req, res) {
    var userObj = req.body;
    userModel
        .createUser(userObj)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.send(status);
                });
        });
}


function localStrategy(username,password, done) {
    userModel.findUserByCredentials(username,password)
        .then(function (user) {
            if(user){
                done(null,user);
            }
            else{
                done(null,false);
            }
        },function (error) {
            done(error,false);

            }
        );
}

function logout(req,res) {
    req.logout();
    res.sendStatus(200);
}

function login(req,res){
    res.json(req.user);

}

function loggedin(req, res) {
    //console.log(req.user);
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        //res.redirect("/login");
        res.send('0');
    }
}

//function to create user
function createUser(req,res) {
    var newUser=req.body;
    userModel.createUser(newUser)
        .then(function (newUser) {
            res.json(newUser);
        });
}

//function to delete user
function deleteUser(req,res) {
    var userId = req.params.userId;
    userModel.deleteUser(userId)
        .then(function (status) {
            res.json(status);
        });
}


//function to update user
function updateUser(req,res) {
    var newUser=req.body;
    var userId=req.params['userId'];
    userModel.updateUser(userId,newUser)
        .then(function (user) {
            //console.log(user);
            res.json(user);
        });
}

//function to find the user by id
function findUserById(req,res) {
    var userId = req.params.userId;
    userModel.findUserById(userId)
        .then(function (user) {
            res.json(user);
        },function () {
            res.sendStatus(404);
    });
}
//function to find Users
function findAllUsers(req,res) {
    username=req.query.username;
    password=req.query.password;
    if (username && password){
        userModel.findUserByCredentials(username,password)
            .then(function (user) {
                if (user===null){
                    res.sendStatus(404);
                }
                else res.json(user);
            },function () {
                res.sendStatus(404);
            });
    }
    else if(username) {
        userModel.findUserByUsername(username)
            .then(function (user) {
                if (user===null){
                    res.sendStatus(404);
                }
                else res.json(user);
            },function () {
                res.sendStatus(404);
            });
    }
    else {
        res.send(users);
    }
}


function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}