var app= require("../../express");
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
    var results=[];
    for (var w in pages){
        if(websiteId===pages[w].websiteId){
            results.push(pages[w]);
        }
    }
    res.json(results);
}

function findPageById(req,res) {
    var pageId=req.params.pageId;
    for (var w in pages){
        if(pageId===pages[w]._id){
            res.json(pages[w]);
            return;
        }
    }
    res.sendStatus(404);
}


// update page given the page id
function updatePage(req,res) {
    var pageId=req.params.pageId;
    var oldPage = req.body;
    //find the website
    for (var w in pages){
        if(pageId===pages[w]._id){
            pages[w]=oldPage;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}


function deletePage(req,res) {
    var pageId=req.params.pageId;
    for(var w in pages){
        if(pageId===pages[w]._id) {
            pages.splice(w, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function createPage(req,res) {
    var page=req.body;
    page._id=(new Date().getTime())+"";
    pages.push(page);
    res.sendStatus(200);
}