(function () {
    angular
        .module("WAM")
        .controller("websiteNewController",websiteNewController);

    function websiteNewController($location,$routeParams,websiteService,currentUser,userService) {

        var model=this;
        model.userId=currentUser._id;//$routeParams['userId'];
        model.logout=logout;

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
            if (typeof website==='undefined'){
                model.error="please enter the details";
                return;
            }
            else if (typeof website.name==='undefined'){
                model.error="please enter a name";
                return ;
            }
            else{
                websiteService.createWebsite(website,model.userId)
                    .then(renders);
                function renders() {
                    $location.url("/websites");
                }
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