(function () {
    angular
        .module("WAM")
        .controller("pageListController",pageListController);

    function pageListController($routeParams,pageService,websiteService) {

        var model=this;
        model.userId=$routeParams['userId'];
        model.websiteId=$routeParams.websiteId;

        function init() {
            model.website = websiteService.findWebsiteById(model.websiteId);
            model.pages = pageService.findAllPagesForWebsite(model.websiteId);
        }
        init();
    }

})();