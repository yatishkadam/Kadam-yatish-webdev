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
                if (start > end) {
                    i = parseInt(end);
                    while (i <= start) {
                        if (i == start)
                            widgets[start].index = end;
                        else
                            widgets[i].index += 1;
                        widgets[i].save();
                        i += 1;
                    }
                }
                else if (end > start) {
                    i = parseInt(start);
                    while (i <= end) {
                        if (i == start)
                            widgets[start].index = end;
                        else widgets[i].index -= 1;
                        i += 1;
                        widgets[i].save();
                    }
                }
                else if (end === start) {
                    end = start;
                    return;
                }
                return;
            });
}