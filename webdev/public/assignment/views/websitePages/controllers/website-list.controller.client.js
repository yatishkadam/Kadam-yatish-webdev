(function () {
    angular
        .module("WAM")
        .controller("websiteListController",websiteListController);

    function websiteListController($routeParams,websiteService) {

        var model=this;
        model.userId=$routeParams['userId'];

        function init() {
            websiteService.findAllwebsiteForUser(model.userId)
                .then(renderWebsites);

            function renderWebsites(websites) {
                model.websites=websites;
            }
        }
        init();
    }
})();