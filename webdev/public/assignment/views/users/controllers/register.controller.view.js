(function () {
    angular
        .module("WAM")
        .controller("registerController",registerController);

    function registerController($location,$routeParams,userService) {
        var model=this;
        model.register=register;

        function register(firstName,lastName,username,email,password,password2) {

            if (typeof username==='undefined'){
                model.error="please enter a username";
                return ;
            }

            if (password!==password2 || password===null || typeof password==='undefined'){
                model.error="password must match";
                return ;
            }
            var found=userService.findUserByUsername(username);
            if (found!==null){
                model.error="username exsists, please try a different username ";
                return;
            }
            else {
                var newUser={
                    username:username,
                    password:password,
                    firstName:firstName,
                    lastName:lastName,
                    email:email
                };
                newUser =userService.createUser(newUser);
                $location.url('/user/'+newUser._id);
            }

        }


    }

})();