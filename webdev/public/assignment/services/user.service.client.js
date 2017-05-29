(function () {
    angular
        .module("WAM")
        .factory('userService',userService);

    function userService() {
        var users=[
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",  email: ""  },
            {_id: "456", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",  email: ""  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",  email: ""  },
            {_id: "234", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: ""  }
        ];

        // api that is provided to access the functionality listed below
        var api={
            findUserById:findUserById,
            findUserByCredentials:findUserByCredentials,
            findUserByUsername:findUserByUsername,
            createUser:createUser,
            updateUser:updateUser

        };
        return api;

        //function to find the user given the user name and the password
        function findUserByCredentials(username,password) {
            for (var u in users) {
                user = users[u];
                if (user.username === username && user.password === password) {
                return user;
                }
            }
            return null;
        }
        function findUserByUsername(username) {

               var user = users.find(function (user) {
                   return user.username===username;
               });
               if(typeof user==='undefined'){
                   return null;
               }
               return user;
        }
        function createUser(newUser) {
            newUser._id=(new Date().getTime()) +"";
            users.push(newUser);
            return newUser;
        }


        //function to find the user by id
        function findUserById(userid) {
            for (var u in users) {
                if (users[u]._id === userid) {
                    return users[u];
                }
            }
            return null;

        }
        function updateUser(userId,user) {
                var oldUser= findUserById(userId);
                var index=users.indexOf(oldUser);
                users[index]=user;
        }
    }
})();