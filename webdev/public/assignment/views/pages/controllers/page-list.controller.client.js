(function () {
    angular
        .module("WAM")
        .controller("pageListController",pageListController);

    function pageListController($routeParams,pageService,currentUser,userService,$location) {

        var model=this;
        model.userId=currentUser._id;//$routeParams['userId'];
        model.websiteId=$routeParams.websiteId;
        model.logout=logout;

        function init() {
            pageService.findAllPagesForWebsite(model.websiteId)
                .then(renderPages);
            function renderPages(pages) {
                model.pages=pages;
            }
        }
        init();
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/login");
                });
        }
    }

})();