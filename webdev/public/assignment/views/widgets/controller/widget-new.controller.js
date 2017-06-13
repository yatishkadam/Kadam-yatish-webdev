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
        model.createWidgetHtml=createWidgetHtml;
        model.createWidgetText=createWidgetText;

        function createWidgetHeader(widget) {
             widgetService.createWidgetHeader(model.pageId, widget)
                .then(function (Id) {
                    $location.url('/user/'+model.userId+'/websites/'+model.websiteId+'/pages/'+model.pageId+'/widget/'+Id);
                });
        }
        function createWidgetHtml(widget){
            widgetService.createWidgetHtml(model.pageId,widget)
                .then(function (Id) {
                    $location.url('/user/'+model.userId+'/websites/'+model.websiteId+'/pages/'+model.pageId+'/widget/'+Id);
                });
        }

        function createWidgetImage(widget) {
            widgetService.createWidgetImage(model.pageId, widget)
                .then(function (Id) {
                    $location.url('/user/' + model.userId + '/websites/' + model.websiteId + '/pages/' + model.pageId + '/widget/' + Id);
                });
        }
        function createWidgetText(widget) {
            widgetService.createWidgetText(model.pageId, widget)
                .then(function (Id) {
                    $location.url('/user/' + model.userId + '/websites/' + model.websiteId + '/pages/' + model.pageId + '/widget/' + Id);
                });
        }
        function createWidgetYoutube(widget) {
            widgetService.createWidgetYoutube(model.pageId, widget)
            .then(function (Id) {
                $location.url('/user/'+model.userId+'/websites/'+model.websiteId+'/pages/'+model.pageId+'/widget/'+Id);
            });
        }


    }

})();
