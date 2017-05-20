module.exports = function(app){
    //find all post
    app.get('/api/post',findAllPosts);
    app.get('/api/post/:index',findPostByIndex);
    app.delete('/api/post/:index',deletePostByIndex);
    //app.put('/api/post/:index',updatePost);

    var posts= [
        {title:'post1',body:'body1'},
        {title:'post2',body:'body2'},
        {title:'post3',body:'body3'}
    ];

    function deletePostByIndex(req,res){
        var index= req.params.index;
        posts.splice(index, 1);
        res.json(200);
    }
    function findPostByIndex(req,res) {
        var index=req.params['index'];
        res.json(posts[index]);
    }

    function findAllPosts(req,res) {
        res.json(posts);
    }
};

