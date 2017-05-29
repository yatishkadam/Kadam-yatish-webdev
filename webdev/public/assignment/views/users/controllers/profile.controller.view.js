(function () {
    angular
        .module("WAM")
        .controller('profileController',profileController);

    function profileController($location,$routeParams,userService) {
        var model = this;
        model.userid = $routeParams['userId'];

        model.user = angular.copy(userService.findUserById(model.userid));
        model.updateUser=updateUser;

        function updateUser(user) {
            userService.updateUser(model.userid,user);
        }
    }

})();