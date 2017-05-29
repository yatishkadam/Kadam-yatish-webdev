(function () {
    angular
        .module("WAM")
        .controller("websiteNewController",websiteNewController);

    function websiteNewController($location,$routeParams,websiteService) {

        var model=this;
        model.userId=$routeParams['userId'];

        function init() {
            model.websites = websiteService.findAllwebsiteForUser(model.userId);
        }
        init();
        model.createWebsite=createWebsite;


        function createWebsite(website) {
            websiteService.createWebsite(website,model.userId);
            $location.url("/user/"+model.userId+"/websites");
        }

    }

})();