(function () {
    angular
        .module("WAM")
        .controller("pageNewController",pageNewController);

    function pageNewController($location,$routeParams,websiteService,pageService,currentUser) {

        var model=this;
        model.userId=currentUser._id;//$routeParams['userId'];
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
                $location.url("/websites/"+model.websiteId+"/pages");
            }
        }

    }

})();