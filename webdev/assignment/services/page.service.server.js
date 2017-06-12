var app= require("../../express");
var pageModel = require("../models/page/page.model.server");
var pages=[
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
    { "_id": "523", "name": "Post 3", "websiteId": "456", "description": "Lorem" }

];

app.get("/api/pages/:websiteId",findAllPagesForWebsite);
app.get("/api/page/:pageId",findPageById);
app.put("/api/page/:pageId",updatePage);
app.delete("/api/page/:pageId",deletePage);
app.post("/api/page",createPage);

function findAllPagesForWebsite(req,res) {
    var websiteId=req.params.websiteId;
    return pageModel.findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            //console.log(pages);
            res.json(pages);
        });
}

function findPageById(req,res) {
    var pageId=req.params.pageId;
    pageModel.findPageById(pageId)
        .then(function (page) {
            console.log(page);
            res.json(page);
        });
}


// update page given the page id
function updatePage(req,res) {
    var pageId=req.params.pageId;
    var newPage = req.body;
    return pageModel.updatePage(pageId,newPage)
        .then(function (status) {
           res.sendStatus(200);
        });
}


function deletePage(req,res) {
    var pageId=req.params.pageId;
    return pageModel.deletePage(pageId)
        .then(function (status) {
            res.sendStatus(200);
        });
    // for(var w in pages){
    //     if(pageId===pages[w]._id) {
    //         pages.splice(w, 1);
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function createPage(req,res) {
    var page=req.body;
    return pageModel.createPage(page)
        .then(function (page) {
            console.log(page);
            res.sendStatus(200);
        });
}