var mongoose=require("mongoose");
var pageSchema=require("./page.schema.server");
var pageModel=mongoose.model("pageModel",pageSchema);

pageModel.createPage=createPage;
pageModel.findAllPagesForWebsite=findAllPagesForWebsite;
pageModel.findPageById=findPageById;
pageModel.updatePage=updatePage;
pageModel.deletePage=deletePage;
module.exports = pageModel;

//create page

function createPage(page) {
    return pageModel.create(page);
}


//find page by ids
function findPageById(pageId) {
    return pageModel.findById(pageId);
}

//find all pages for a website
function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_websiteId:websiteId});
}

//update page
function updatePage(pageId,newPage) {
    return pageModel.update({_id: pageId}, {$set: newPage});

}

function deletePage(pageId) {
    return pageModel.remove({_id:pageId});
}