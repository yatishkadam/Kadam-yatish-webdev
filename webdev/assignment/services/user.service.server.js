var app=require('../../express');

var userModel = require("../../assignment/models/user/user.model.server");
var users=[
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",  email: ""  },
    {_id: "456", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",  email: ""  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",  email: ""  },
    {_id: "234", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: ""  }
];

app.get    ("/api/user",findAllUsers);
app.post   ("/api/user",createUser);
app.put    ("/api/user/:userId",updateUser);
app.get    ("/api/user/:userId",findUserById);
app.delete ("/api/user/:userId",deleteUser);


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
    // for (var u in users) {
    //     if (users[u]._id === userId) {
    //         users.splice(u,1);
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
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
    // for (var u in users) {
    //     if (users[u]._id === userId) {
    //         users[u]=newUser;
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
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