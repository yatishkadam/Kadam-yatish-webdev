var mongoose=require("mongoose");
var pageSchema=require("./page.schema.server");
var pageModel=mongoose.model("pageModel",pageSchema);
var websiteModel = require("../website/website.model.server");

pageModel.createPage=createPage;
pageModel.findAllPagesForWebsite=findAllPagesForWebsite;
pageModel.findPageById=findPageById;
pageModel.updatePage=updatePage;
pageModel.deletePage=deletePage;
pageModel.addWidget=addWidget;
module.exports = pageModel;

//create page

function createPage(page) {
    return pageModel.create(page)
        .then(function (page) {
            websiteModel.addPage(page._websiteId,page._id);
        });
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

function deletePage(websiteId,pageId) {
    return pageModel.remove({_id:pageId})
        .then(function (status) {
            websiteModel.deletePageForWebsite(websiteId,pageId);
        });
}


//add websites
function addWidget(pageId,widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}

//delete the website after deleteing the website
function deleteWidgetForPage(pageId,widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index= page.widgets.indexOf(widgetId);
            page.widgets.splice(index,1);
            return page.save();
        });
}