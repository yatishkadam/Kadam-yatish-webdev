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
            pageService.findPageById(model.pageId)
                .then(renderPage);
            function renderPage(page) {
                model.page = angular.copy(page);
            }
        }
        init();
        model.updatePage=updatePage;
        model.deletePage=deletePage;

        function updatePage(pageId,page) {
            pageService.updatePage(pageId,page)
                .then(updatedPage);
            function updatedPage() {
                $location.url("/user/"+model.userId+"/websites/"+model.websiteId+"/pages");
            }
        }

        function deletePage(pageId){
            pageService.deletePage(model.websiteId,pageId)
                .then(updateLocation);
            function updateLocation() {
                $location.url("/user/"+model.userId+"/websites/"+model.websiteId+"/pages");
            }
        }
    }

})();