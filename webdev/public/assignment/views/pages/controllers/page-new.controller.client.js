(function () {
    angular
        .module("WAM")
        .controller("pageNewController",pageNewController);

    function pageNewController($location,$routeParams,websiteService,pageService) {

        var model=this;
        model.userId=$routeParams['userId'];
        model.websiteId=$routeParams['websiteId'];

        function init() {
            pageService.findAllPagesForWebsite(model.websiteId)
                .then(renderPages);
            function renderPages(pages){
                model.pages =angular.copy(pages);
            }
        }
        init();
        model.createPage=createPage;

        function createPage(page) {

            pageService.createPage(page,model.websiteId)
                .then(newlocation);
            function newlocation(response) {
                $location.url("/user/"+model.userId+"/websites/"+model.websiteId+"/pages");
            }
        }

    }

})();