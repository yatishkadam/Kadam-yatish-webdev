(function () {
    angular
        .module("WAM")
        .controller('widgetEditController',widgetEditController);
    function widgetEditController($location,$routeParams,widgetService) {
        var model=this;
        model.userId=$routeParams['userId'];
        model.websiteId=$routeParams['websiteId'];
        model.widgetId=$routeParams['widgetId'];
        model.pageId=$routeParams.pageId;

        function init() {
            model.widget = widgetService.findWidgetById(model.widgetId);
        }
        init();
        model.updateWidget=updateWidget;
        model.deleteWidget=deleteWidget;

        function updateWidget(widgetId, widget) {

            widgetService.updateWidget(widgetId, widget);
            $location.url("/user/"+model.userId+"/websites/"+model.websiteId+"/pages/"+model.pageId+"/widget");
        }

        function deleteWidget(widgetId){
            widgetService.deleteWidget(widgetId);
            $location.url("/user/"+model.userId+"/websites/"+model.websiteId+"/pages/"+model.pageId+"/widget");
        }


    }

})();