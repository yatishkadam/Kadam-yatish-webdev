(function () {
    angular
        .module("WAM")
        .service('widgetService',widgetService);
function widgetService() {


    var widget=[
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];


    this.findWidgetById= findWidgetById;
    this.findWidgetsByPageId= findWidgetsByPageId;
    this.updateWidget=updateWidget;
    this.deleteWidget=deleteWidget;
    this.createWidget=createWidget;
    this.createWidgetHeader=createWidgetHeader;
    this.createWidgetImage=createWidgetImage;
    this.createWidgetYoutube=createWidgetYoutube;


    function createWidgetHeader(pageId, widget1) {
        widget1 = { "_id": "", "widgetType": "HEADING", "pageId": "", "size": "", "text": "", "name": ""};
        widget1._id = (new Date()).getTime() + "";
        widget1.pageId = pageId;
        widget.push(widget1);
        return widget1._id;
    }

    function createWidgetImage(pageId, widget1) {
        widget1 = { "_id": "", "widgetType": "IMAGE", "pageId": "", "width": "", "url": "", "text": "", "name": "" };
        widget1._id = (new Date()).getTime() + "";
        widget1.pageId = pageId;
        widget.push(widget1);
        return widget1._id;
    }

    function createWidgetYoutube(pageId, widget1) {
        widget1 = { "_id": "", "widgetType": "YOUTUBE", "pageId": "", "width": "", "url": "", "text": "", "name": ""};
        widget1._id = (new Date()).getTime() + "";
        widget1.pageId = pageId;
        widget.push(widget1);
        return widget1._id;
    }

    function findWidgetsByPageId(pageId) {
        var results=[];
        for (var w in widget){
            if(pageId===widget[w].pageId){
                results.push(widget[w]);
            }
        }
        return results;

    }
    function findWidgetById(widgetId) {
        for (var w in widget){
            if(widgetId===widget[w]._id){
                return widget[w];
            }
        }
        return null;
    }

    function updateWidget(widgetId, widgets) {
        var oldWebsite= findWidgetById(widgetId);
        var index=widget.indexOf(oldWebsite);
        widget[index]=widgets;
    }
    function deleteWidget(widgetId) {
        var oldWidget= findWidgetById(widgetId);
        var index=widget.indexOf(oldWidget);
        widget.splice(index,1);
    }


    function createWidget(widgets,pageId,widgetType) {
        widgets._id=(new Date().getTime())+"";
        widgets.pageId=pageId;
        widget.widgetType=widgetType;
        widget.push(widgets);
    }


}


})();