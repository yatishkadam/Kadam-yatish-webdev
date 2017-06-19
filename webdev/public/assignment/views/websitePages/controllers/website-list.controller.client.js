(function () {
    angular
        .module("WAM")
        .controller("websiteListController",websiteListController);

    function websiteListController($routeParams,websiteService,currentUser,userService,$location) {

        var model=this;
        model.userId=currentUser._id;//$routeParams['userId'];

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