var app=require('../../express');
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


//function to delete user
function deleteUser(req,res) {
    var userId = req.params.userId;
    for (var u in users) {
        if (users[u]._id === userId) {
            users.splice(u,1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}


//function to update user
function updateUser(req,res) {
    var newUser=req.body;
    var userId=req.params['userId']
    for (var u in users) {
        if (users[u]._id === userId) {
            users[u]=newUser;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}
//function to create user
function createUser(req,res) {
    var newUser=req.body;
    newUser._id=(new Date().getTime()) +"";
    users.push(newUser);
    res.json(newUser);
}
//function to find the user by id
function findUserById(req,res) {
    var userId = req.params.userId;
    for (var u in users) {
        if (users[u]._id === userId) {
            res.json(users[u]);
            return;
        }
    }
    res.sendStatus(404);
}
//function to find Users
function findAllUsers(req,res) {
    username=req.query.username;
    password=req.query.password;
    if (username && password){
        for (var u in users) {
            user = users[u];
            if (user.username === username && user.password === password) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
    }
    else if(username) {
        for (var u in users) {
            user = users[u];
            if (user.username === username) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
    }
    else {
        res.send(users);
    }
}