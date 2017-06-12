var mongoose=require("mongoose");
var websiteSchema=require("./website.schema.server");
var websiteModel = mongoose.model('websiteModel',websiteSchema);
var userModel = require('../user/user.model.server');

websiteModel.createWebsite=createWebsite;
websiteModel.findAllWebsiteForUser=findAllWebsiteForUser;
websiteModel.findWebsiteById=findWebsiteById;
websiteModel.updateWebsite=updateWebsite;
websiteModel.deleteWebsite=deleteWebsite;


module.exports=websiteModel;


function createWebsite(website) {
    return websiteModel.create(website)
        .then(function (website) {
            //console.log(website._user,website._id);
            userModel.addWebsite(website._user,website._id);
            return;
        });
}
function findAllWebsiteForUser(userId) {
    return websiteModel
        .find({_user:userId})
        .populate("_user")
        .exec();
}

function updateWebsite(websiteId,newWebsite) {
    return websiteModel.update({_id:websiteId},{$set:newWebsite});
}

function findWebsiteById(websiteId) {
    return websiteModel.findOne({_id:websiteId});
}

function deleteWebsite(websiteId,userId) {
    return websiteModel.remove({_id:websiteId})
        .then(function () {
            userModel.deleteWebsiteUser(userId,websiteId);
            return;
        });
}