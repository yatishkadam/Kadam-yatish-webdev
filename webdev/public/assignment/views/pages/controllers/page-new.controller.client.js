(function () {
    angular
        .module("WAM")
        .controller("pageNewController",pageNewController);

    function pageNewController($location,$routeParams,websiteService,pageService,currentUser,userService) {

        var model=this;
        model.userId=currentUser._id;//$routeParams['userId'];
        model.websiteId=$routeParams['websiteId'];
        model.logout=logout;

        function init() {
            pageService.findAllPagesForWebsite(model.websiteId)
                .then(renderPages);
            function renderPages(pages){
                model.pages =angular.copy(pages);
            }
        }
        init();
        model.createPage=createPage;

        function createPage(page) {
            //console.log(page);
            if (typeof page==='undefined'){
                model.error="please enter the details";
                return;
            }
            else if (typeof page.name==='undefined'){
                model.error="please enter a name";
                return ;
            }
            else {

                pageService.createPage(page, model.websiteId)
                    .then(newlocation);
                function newlocation(response) {
                    $location.url("/websites/" + model.websiteId + "/pages");
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