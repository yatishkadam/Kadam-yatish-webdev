var mongoose = require("mongoose");

var pageSchema = mongoose.Schema({
    _websiteId    :    {type:mongoose.Schema.Types.ObjectId, ref:"websiteModel"},
    name        :    String,
    title       :    String,
    description :    String,
    widgets     :    [{type:mongoose.Schema.Types.ObjectId,ref :"widgetModel"}],
    dateCreated :    {type:Date,default:Date.now}

},{collection:"page"});

module.exports=pageSchema;