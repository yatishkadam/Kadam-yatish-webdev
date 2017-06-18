(function () {
    angular
        .module("WAM")
        .controller("pageListController",pageListController);

    function pageListController($routeParams,pageService,currentUser) {

        var model=this;
        model.userId=currentUser._id;//$routeParams['userId'];
        model.websiteId=$routeParams.websiteId;

        function init() {
            pageService.findAllPagesForWebsite(model.websiteId)
                .then(renderPages);
            function renderPages(pages) {
                model.pages=pages;
            }
        }
        init();
    }

})();