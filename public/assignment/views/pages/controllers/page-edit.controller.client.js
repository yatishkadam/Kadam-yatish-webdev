(function () {
    angular
        .module("WAM")
        .controller("pageEditController",pageEditController);

    function pageEditController($location,$routeParams,websiteService,pageService,currentUser,userService) {

        var model=this;
        model.userId=currentUser._id;//$routeParams['userId'];
        model.websiteId=$routeParams['websiteId']
        model.pageId=$routeParams['pageId'];
        model.logout=logout;

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
            if (page.name===""){
                model.error="please enter a name";
                return ;
            }
            else {
            pageService.updatePage(pageId,page)
                .then(updatedPage);
            function updatedPage() {
                $location.url("/websites/" + model.websiteId + "/pages");
            }
            }
        }

        function deletePage(pageId){
            pageService.deletePage(model.websiteId,pageId)
                .then(updateLocation);
            function updateLocation() {
                $location.url("/websites/"+model.websiteId+"/pages");
            }
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