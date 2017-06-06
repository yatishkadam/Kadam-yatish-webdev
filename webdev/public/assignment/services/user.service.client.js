(function () {
    angular
        .module("WAM")
        .factory('userService',userService);

    function userService($http) {
        // api that is provided to access the functionality listed below
        var api={
            findUserById:findUserById,
            findUserByCredentials:findUserByCredentials,
            findUserByUsername:findUserByUsername,
            createUser:createUser,
            updateUser:updateUser,
            deleteUser:deleteUser
        };
        return api;

        //function to delete
        function deleteUser(userId) {
            var url='/api/user/'+userId;
            return $http.delete(url)
                .then(function (response){
                    return response.data;
                    }
                );
        }

        //function to find the user given the user name and the password
        function findUserByCredentials(username,password) {
            var url='/api/user?username='+username+"&password="+password;
            return $http
                .get(url)
                .then(renderUser);
            //return the user
            function renderUser(response) {
                return response.data;
            }
        }
        //find user by username
        function findUserByUsername(username) {
            var url='/api/user?username='+username;
            return $http.get(url)
                .then(renderUser);
            //return the user
            function renderUser(response) {
                return response.data;
            }
        }
        //create user
        function createUser(newUser) {
            var url= "/api/user";
            return $http.post(url,newUser)
                .then(renderUser);
            //return the created user details
            function renderUser(response) {
                return response.data;
            }
        }
        //function to find the user by id
        function findUserById(userId) {
            var url='/api/user/'+userId;
            return $http.get(url)
                .then(renderUser);
            //return the user
            function renderUser(response) {
                return response.data;
            }
        }
        function updateUser(userId,user) {
            var url='/api/user/'+userId;
            return $http.put(url,user)
                .then(renderUser);
            //return the user
            function renderUser(response) {
                return response.data;
            }
        }
    }
})();