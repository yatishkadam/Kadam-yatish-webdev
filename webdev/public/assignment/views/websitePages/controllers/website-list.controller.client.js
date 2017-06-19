(function () {
    angular
        .module("WAM")
        .controller("websiteListController",websiteListController);

    function websiteListController($location,websiteService,currentUser,userService) {

        var model=this;
        model.userId=currentUser._id;//$routeParams['userId'];
        model.logout=logout;

        function init() {
            websiteService.findAllwebsiteForUser(model.userId)
                .then(renderWebsites);

            function renderWebsites(websites) {
                model.websites=websites;
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