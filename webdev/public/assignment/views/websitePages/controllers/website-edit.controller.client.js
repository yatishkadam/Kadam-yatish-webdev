(function () {
    angular
        .module("WAM")
        .controller("websiteEditController",websiteEditController);

    function websiteEditController($location,$routeParams,websiteService,currentUser,userService) {

        var model=this;
        model.userId=currentUser._id;//$routeParams['userId'];
        model.websiteId=$routeParams['websiteId'];
        model.logout=logout;

        function init() {

            //find all websites
            websiteService.findAllwebsiteForUser(model.userId)
                .then(renderWebsites);
            function renderWebsites(websites) {
                model.websites=websites;
            }

            //individual website
            websiteService.findWebsiteById(model.websiteId)
                .then(function (website) {
                    model.website = angular.copy(website);
                });

        }
        init();
        model.updateWebsite=updateWebsite;
        model.deleteWebsite=deleteWebsite;

        function updateWebsite(websiteId,website) {
            //console.log(website.name);
            if (website.name===""){
                model.error="please enter a name";
                return ;
            }
            else {
                websiteService.updateWebsite(websiteId,website)
                    .then(render);
                function render() {
                    $location.url("/websites");
                }
            }
        }

        function deleteWebsite(websiteId){
            websiteService.deleteWebsite(websiteId,model.userId)
                .then(render);
            function render() {
                $location.url("/websites");
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