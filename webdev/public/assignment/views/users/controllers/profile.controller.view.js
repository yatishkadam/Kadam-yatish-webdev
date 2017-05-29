(function () {
    angular
        .module("WAM")
        .controller('profileController',profileController);

    function profileController($location,$routeParams,userService) {
        var model = this;
        model.userid = $routeParams['userId'];

        model.user = userService.findUserById(model.userid);


    }

})();