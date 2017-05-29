(function () {
    angular
        .module("WAM")
        .controller("websiteEditController",websiteEditController);

    function websiteEditController($location,$routeParams,websiteService) {

        var model=this;
        model.userId=$routeParams['userId'];
        model.websiteId=$routeParams['websiteId'];

        function init() {
            model.websites = websiteService.findAllwebsiteForUser(model.userId);
            model.website=websiteService.findWebsiteById(model.websiteId);
            model.owebsite = angular.copy(model.website);

        }
        init();
        model.updateWebsite=updateWebsite;
        model.deleteWebsite=deleteWebsite;

        function updateWebsite(websiteId,website) {
            websiteService.updateWebsite(websiteId,website);
            $location.url("/user/"+model.userId+"/websites");
        }

        function deleteWebsite(websiteId){
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/websites');
        }
    }

})();