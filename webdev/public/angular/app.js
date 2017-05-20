(function () { // IIFE = Immediately invoked function expression
    angular
        .module("BlogApp", [])
        .controller("BlogPostListController", BlogPostListController );

    function BlogPostListController($scope, $http) {
        $scope.post = {title:'default title',body:'default body'};
        $scope.posts=[];

        function init() {
            findBlogPosts();

        }
        init();

        function findBlogPosts() {
            $http.get('/api/post')
                .then(function (response) {
                    $scope.posts = response.data;
                });
        }



        //event handlers
        $scope.deletePost = deletePost;
        $scope.addpost = addpost;
        $scope.editPost=editPost;
        $scope.updatePost=updatePost;

        //event handler
        function addpost(post){
            var newpost={
                title:post.title,
                body:post.body,
                date:new Date()
            };
            $scope.posts.push(newpost);
            console.log($scope.posts);
        }
        function editPost(index) {
            $scope.post = angular.copy($scope.posts[index]);
            $scope.index=index;
        }
        function updatePost(post) {
            //$scope.posts[$scope.index]=angular.copy(post);
            $http.put('api/post/'+index);
        }
        function deletePost(index) {
            //$scope.posts.splice(index,1);
            $http
                .delete('/api/post/'+index)
                .success(findBlogPosts);
        }
    }

})();