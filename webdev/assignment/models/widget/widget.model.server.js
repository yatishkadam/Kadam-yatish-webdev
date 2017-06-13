var mongoose=require("mongoose");
var widgetSchema=require("./widget.schema.server");
var widgetModel=mongoose.model("widgetModel",widgetSchema);
var pageModel=require("../page/page.model.server");


widgetModel.createWidget=createWidget;
widgetModel.findAllWidgetsForPage=findAllWidgetsForPage;
widgetModel.updateWidget=updateWidget;
widgetModel.findWidgetById=findWidgetById;
widgetModel.deleteWidget=deleteWidget;
widgetModel.reorderwidgets=reorderwidgets;
module.exports = widgetModel;

function createWidget(widget) {
    //console.log(widget);
    return widgetModel.create(widget);

}

function findAllWidgetsForPage(pageId){
    return widgetModel
        .find({_page:pageId})
        .sort({index:1})
        .exec();
}
function updateWidget(widgetId,newWidget){
    return widgetModel.update({_id:widgetId},{$set:newWidget});
}

function findWidgetById(widgetId){
    return widgetModel.findOne({_id:widgetId});
}


function deleteWidget(widgetId) {
    return widgetModel.remove({_id:widgetId});
}


function reorderwidgets(pageId,start,end){
    return widgetModel.find({ _page: pageId })
        .sort({index: 1})
        .then(
            function (widgets) {

                for (var i in widgets) {

                    if ((i >= start && i <= end) ||
                        (i >= end && i <= start)) {

                        if (i == start)
                            widgets[i].index = end;
                        else if (start > end) {
                            widgets[i].index += i + 1;
                        }
                        else {
                            widgets[i].index = i - 1;
                        }
                    }
                    else {
                        widgets[i].index = i;
                    }

                    widgets[i].save();
                }

                return;
            }
        );
}
