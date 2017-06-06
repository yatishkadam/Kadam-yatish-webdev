var app = require("../../express");
var websites=[
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.get("/api/websites/:userId",findAllwebsiteForUser);
app.get("/api/website/:websiteId",findWebsiteById);
app.post("/api/user/:userId/website",createWebsite);
app.put("/api/website/:websiteId",updateWebsite);
app.delete("/api/website/:websiteId",deleteWebsite);



//find all the website for a given user
function findAllwebsiteForUser(req,res) {
    var userId=req.params.userId;
    var results=[];
    for (var w in websites){
        if(userId===websites[w].developerId){
            results.push(websites[w]);
        }
    }
    res.json(results);
}


//find website given the website id
function findWebsiteById(req,res) {
    var websiteId=req.params.websiteId;
    for (var w in websites){
        if(websiteId===websites[w]._id){
            res.json(websites[w]);
            return;
        }
    }
    res.sendStatus(404);
}

// update website given the website id
function updateWebsite(req,res) {
    var websiteId=req.params.websiteId;
    var oldwebsite = req.body;
    //find the website
    for (var w in websites){
        if(websiteId===websites[w]._id){
            websites[w]=oldwebsite;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

//delete the webiste given the website id
function deleteWebsite(req,res) {
    var websiteId=req.params.websiteId;
    for (var w in websites){
        if(websiteId===websites[w]._id){
            websites.splice(w,1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}


function createWebsite(req,res) {
    var website=req.body;
    website._id=(new Date().getTime())+"";
    websites.push(website);
    res.sendStatus(200);
}
