var app = require("../../express");
var websiteModel= require("../models/website/website.model.server")
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
app.delete("/api/user/:userId/website/:websiteId",deleteWebsite);



//find all the website for a given user
function findAllwebsiteForUser(req,res) {
    var userId=req.params.userId;
    websiteModel.findAllWebsiteForUser(userId)
        .then(function (websites) {
            //console.log(websites);
            res.json(websites);
        });
}


//find website given the website id
function findWebsiteById(req,res) {
    var websiteId=req.params.websiteId;
    websiteModel.findWebsiteById(websiteId)
        .then(function (website) {
            //console.log("inside findWebsiteById"+website);
            res.json(website);
        });
}

// update website given the website id
function updateWebsite(req,res) {
    var websiteId=req.params.websiteId;
    var newWebsite = req.body;
    //console.log(newWebsite);
    websiteModel.updateWebsite(websiteId,newWebsite)
        .then(function (website) {
            //console.log(website);
            res.json(website);
        });
}

//delete the webiste given the website id
function deleteWebsite(req,res) {
    var websiteId=req.params.websiteId;
    var userId=req.params.userId;
    websiteModel.deleteWebsite(websiteId,userId)
        .then(function (response) {
            res.json(response);
        });
}


function createWebsite(req,res) {
    var userId=req.params.userId;
    var website=req.body;
    website._user=userId;
    //console.log(website);
    websiteModel.createWebsite(website)
        .then(function (response) {
        //console.log(response);
        res.sendStatus(200);
    });

}
