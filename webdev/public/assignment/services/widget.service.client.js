(function () {
    angular
        .module("WAM")
        .service('widgetService',widgetService);
function widgetService($http) {

    this.findWidgetById= findWidgetById;
    this.findWidgetsByPageId= findWidgetsByPageId;
    this.updateWidget=updateWidget;
    this.deleteWidget=deleteWidget;
    this.createWidgetHeader=createWidgetHeader;
    this.createWidgetImage=createWidgetImage;
    this.createWidgetYoutube=createWidgetYoutube;
    this.sendSortOrder=sendSortOrder;


    function createWidgetHeader(pageId, widget1) {
        url="/api/page/"+pageId+"/widget";
        widget1 = {"widgetType": "HEADING"};
        widget1.pageId = pageId;
        return $http.post(url,widget1)
            .then(function (response) {
                return response.data;
            });
    }
    function createWidgetImage(pageId, widget1) {
        url="/api/page/"+pageId+"/widget";
        widget1 = {"widgetType": "IMAGE", "width": "100%"};
        widget1.pageId = pageId;
        return $http.post(url,widget1)
            .then(function (response) {
                return response.data;
            });
    }

    function createWidgetYoutube(pageId, widget1) {
        url="/api/page/"+pageId+"/widget";
        widget1 = {"widgetType": "YOUTUBE"};
        widget1.pageId = pageId;
        return $http.post(url,widget1)
            .then(function (response) {
                return response.data;
            });
    }

    function findWidgetsByPageId(pageId) {
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
                // console.log("_________client Widget__________");
                // console.log(response);
                // console.log(response.data);
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

    function sendSortOrder(pageId,from,to) {
        var url="/api/page/"+pageId+"/reorderWidgets?from="+from+"&to="+to;
        return $http.get(url)
            .then(function(response){
                return response.data;
            });
    }
}
})();