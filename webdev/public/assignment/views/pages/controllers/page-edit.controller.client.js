(function () {
    angular
        .module("WAM")
        .controller("pageEditController",pageEditController);

    function pageEditController($location,$routeParams,websiteService,pageService) {

        var model=this;
        model.userId=$routeParams['userId'];
        model.websiteId=$routeParams['websiteId']
        model.pageId=$routeParams['pageId'];

        function init() {
            model.page = angular.copy(pageService.findPageById(model.pageId));
        }
        init();
        model.updatePage=updatePage;
        model.deletePage=deletePage;

        function updatePage(pageId,page) {
            pageService.updatePage(pageId,page);
            $location.url("/user/"+model.userId+"/websites/"+model.websiteId+"/pages");
        }

        function deletePage(pageId){
            pageService.deletePage(pageId);
            $location.url("/user/"+model.userId+"/websites/"+model.websiteId+"/pages");
        }
    }

})();