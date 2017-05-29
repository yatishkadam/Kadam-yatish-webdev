(function () {
    angular
        .module("WAM")
        .controller("websiteListController",websiteListController);
    
    function websiteListController($routeParams,websiteService) {

        var model=this;
        model.userId=$routeParams['userId'];

        function init() {
            model.websites = websiteService.findAllwebsiteForUser(model.userId);
        }
        init();
    }
    
})();