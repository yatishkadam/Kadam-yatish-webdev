(function () {
    angular
        .module("WAM")
        .controller("websiteNewController",websiteNewController);

    function websiteNewController($location,$routeParams,websiteService) {

        var model=this;
        model.userId=$routeParams['userId'];

        function init() {
            //find all the website for a user
            websiteService.findAllwebsiteForUser(model.userId)
                .then(renderWebsites);
            function renderWebsites(websites) {
                model.websites=websites;
            }
        }
        init();
        model.createWebsite=createWebsite;

        //create new website
        function createWebsite(website) {
            websiteService.createWebsite(website,model.userId)
                .then(renders);
            function renders() {
                $location.url("/user/"+model.userId+"/websites");
            }
        }

    }

})();