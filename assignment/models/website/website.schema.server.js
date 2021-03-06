var mongoose=require("mongoose");

var websiteSchema=mongoose.Schema({
    _user:{type:mongoose.Schema.Types.ObjectId, ref:"userModel"},
    name:String,
    description:String,
    dateCreated:{type:Date,default:Date.now},
    pages:[{type:mongoose.Schema.Types.ObjectId, ref : "pageModel"}]
},{collection:'website'});

module.exports=websiteSchema;