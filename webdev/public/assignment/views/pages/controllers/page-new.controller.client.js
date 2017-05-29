(function () {
    angular
        .module("WAM")
        .controller("pageNewController",pageNewController);

    function pageNewController($location,$routeParams,websiteService,pageService) {

        var model=this;
        model.userId=$routeParams['userId'];
        model.websiteId=$routeParams['websiteId'];

        function init() {
            model.pages = pageService.findAllPagesForWebsite(model.websiteId);
        }
        init();
        model.createPage=createPage;


        function createPage(page) {
            pageService.createPage(page,model.websiteId);
            $location.url("/user/"+model.userId+"/websites/"+model.websiteId+"/pages");
        }

    }

})();