(function () {
    angular
        .module("WAM")
        .controller('widgetNewController',widgetNewController);
    function widgetNewController($location,$routeParams,widgetService) {
        var model=this;
        model.userId=$routeParams['userId'];
        model.websiteId=$routeParams['websiteId'];
        model.pageId=$routeParams.pageId;
        model.createWidgetHeader=createWidgetHeader;
        model.createWidgetImage=createWidgetImage;
        model.createWidgetYoutube=createWidgetYoutube;

        function createWidgetHeader(widget) {
            var widgetId = widgetService.createWidgetHeader(model.pageId, widget);
            $location.url('/user/'+model.userId+'/websites/'+model.websiteId+'/pages/'+model.pageId+'/widget/'+widgetId);
        }

        function createWidgetImage(widget) {
            var widgetId = widgetService.createWidgetImage(model.pageId, widget);
            $location.url('/user/'+model.userId+'/websites/'+model.websiteId+'/pages/'+model.pageId+'/widget/'+widgetId);
        }

        function createWidgetYoutube(widget) {
            var widgetId =  widgetService.createWidgetYoutube(model.pageId, widget);
            $location.url('/user/'+model.userId+'/websites/'+model.websiteId+'/pages/'+model.pageId+'/widget/'+widgetId);
        }


    }

})();
