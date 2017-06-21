
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/webdev");
mongoose.Promise=require("q").Promise;
var blogPostSchema = mongoose.Schema({
    title:String,
    body:String,
    postDate:{type : Date, default:Date.now},
    thumbsUp: {type : Number, default : 0}
},{collection: "blogpost"});

var blogModel=mongoose.model("BlogPost",blogPostSchema);

//createBlogPost({title:"post 7",body:"post 7 body"}).then(S,E);
// findAllBlogs()
//     .then(S,E);
//findBlogById('593c13f950c9a409e4585da0').then(S,E);
updateBlog("593c13f950c9a409e4585da0",{body:"body updated"}).then(function (status) {
    console.log(status);
},E);

function S(blogpost) {
    console.log(blogpost);
}
function E(err) {
    console.error(err);
}


function createBlogPost(blogPost) {
    return blogModel.create(blogPost);
}

function findAllBlogs(){
    return blogModel.find()
}

function findBlogById(Id) {
    return blogModel.findById(Id);
}

function updateBlog(Id,newPost) {
    return blogModel
        .update({_id:Id},{
        $set:newPost
        })

}