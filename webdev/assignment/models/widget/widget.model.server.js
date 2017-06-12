var mongoose=require("mongoose");
var widgetSchema=require("./widget.schema.server");
var widgetModel=mongoose.model("widgetModel",widgetSchema);
var pageModel=require("../page/page.model.server");


widgetModel.createWidget=createWidget;
widgetModel.findAllWidgetsForPage=findAllWidgetsForPage;
widgetModel.updateWidget=updateWidget;
widgetModel.findWidgetById=findWidgetById;
module.exports = widgetModel;

function createWidget(widget) {
    return widgetModel.create(widget);
}

function findAllWidgetsForPage(pageId){
    return widgetModel.find({_page:pageId});
}
function updateWidget(widgetId,newWidget){
    return widgetModel.update({_id:widgetId},{$set:newWidget});
}

function findWidgetById(widgetId){
    return widgetModel.findOne({_id:widgetId});
}