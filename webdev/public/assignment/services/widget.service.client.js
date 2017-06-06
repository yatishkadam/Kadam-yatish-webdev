(function () {
    angular
        .module("WAM")
        .service('widgetService',widgetService);
function widgetService($http) {

    this.findWidgetById= findWidgetById;
    this.findWidgetsByPageId= findWidgetsByPageId;
    this.updateWidget=updateWidget;
    this.deleteWidget=deleteWidget;
    //this.createWidget=createWidget;
    this.createWidgetHeader=createWidgetHeader;
    this.createWidgetImage=createWidgetImage;
    this.createWidgetYoutube=createWidgetYoutube;


    function createWidgetHeader(pageId, widget1) {
        url="/api/page/"+pageId+"/widget";
        widget1 = { "_id": "", "widgetType": "HEADING", "pageId": "", "size": "", "text": "", "name": ""};
        widget1.pageId = pageId;
        return $http.post(url,widget1)
            .then(function (response) {
                return response.data;
            });
    }
    function createWidgetImage(pageId, widget1) {
        url="/api/page/"+pageId+"/widget";
        widget1 = { "_id": "", "widgetType": "IMAGE", "pageId": "", "width": "100%", "url": "", "text": "", "name": "" };
        widget1.pageId = pageId;
        return $http.post(url,widget1)
            .then(function (response) {
                return response.data;
            });
    }

    function createWidgetYoutube(pageId, widget1) {
        url="/api/page/"+pageId+"/widget";
        widget1 = { "_id": "", "widgetType": "YOUTUBE", "pageId": "", "width": "", "url": "", "text": "", "name": ""};
        widget1.pageId = pageId;
        return $http.post(url,widget1)
            .then(function (response) {
                return response.data;
            });
    }

    function findWidgetsByPageId(pageId) {
        // var results=[];
        // for (var w in widget){
        //     if(pageId===widget[w].pageId){
        //         results.push(widget[w]);
        //     }
        // }
        // return results;
        var url="/api/page/"+pageId+"/widget";
        return $http.get(url)
            .then(renderWidget);
        function renderWidget(response) {
            return response.data;
        }
    }
    function findWidgetById(widgetId) {
        var url="/api/widget/"+widgetId;
        return $http.get(url)
            .then(function (response) {
                return response.data;
            });
    }

    //update the widget
    function updateWidget(widgetId, widget) {
        var url="/api/widget/"+widgetId;
        return $http.put(url,widget)
            .then(renderStatus);
        function renderStatus(response) {
            return response.data;
        }
    }


    function deleteWidget(widgetId) {
        var url="/api/widget/"+widgetId;
        return $http.delete(url)
            .then(renderss);
        function renderss(response){
                return response.data;
            }
    }


    // function createWidget(widgets,pageId,widgetType) {
    //     widgets._id=(new Date().getTime())+"";
    //     widgets.pageId=pageId;
    //     widget.widgetType=widgetType;
    //     widget.push(widgets);
    // }
}
})();