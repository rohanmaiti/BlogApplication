const mongoose = require("mongoose");
const Blogs = require("./blog.model");
const User = require("./user.model");
const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        require:true,
    },
    blog_id:{
        type:String,
        ref:Blogs,
        require:true
    },
    createdat:{
        type:String,
        require:true
    },
    name:{
        type:String,
        ref:User
    },
    user_id:{
        type:String,
        ref:User
    }
},
{timestamps:true}
)

const Comment = mongoose.model("comments",commentSchema);
module.exports = Comment;