(function () {
    angular
        .module("WAM")
        .controller('widgetEditController',widgetEditController);
    function widgetEditController($location,$routeParams,widgetService,currentUser,userService) {
        var model=this;
        model.userId=currentUser._id;//$routeParams['userId'];
        model.websiteId=$routeParams['websiteId'];
        model.widgetId=$routeParams['widgetId'];
        model.pageId=$routeParams.pageId;

        function init() {
            //model.widget =widgetService.findWidgetById(model.widgetId);
            widgetService.findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget=widget;
                });

        }
        init();
        model.updateWidget=updateWidget;
        model.deleteWidget=deleteWidget;

        function updateWidget(widgetId, widget) {
            widgetService.updateWidget(widgetId, widget)
                .then(render);
            function render() {
                $location.url("/websites/"+model.websiteId+"/pages/"+model.pageId+"/widget");
            }
        }

        function deleteWidget(widgetId){
            widgetService.deleteWidget(widgetId)
                .then(function () {
                    $location.url("/websites/"+model.websiteId+"/pages/"+model.pageId+"/widget");
                });
        }
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/login");
                });
        }
    }
})();