const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");

function handleCreateBlogGet(req,res){
    res.render("createBlog",{user : req.session.user});
}

async function handleCreateBlogPost(req,res){
    try {
        // console.log(req.body);
        // console.log( req.session.user.email);
       
        const {text, title} = req.body;
        await Blog.create({
            text:text,
            title:title,
            authorEmail:req.session.user.email,
            authorName:req.session.user.name
        })
        res.status(200).json({message:"sucessfully uploded!"})
    } catch (error) {
        res.status(500).json({message:"server side error"})
    }
}

function handleYourBlogsGet(req,res){
    res.render("yourBlogs",{user:req.session.user});
}

async function handleMyBlogsGet(req,res){
const blogs = await Blog.find({authorEmail:req.session.user.email});
res.json({blogs:blogs});
}

async function handleUpdateBlogPost(req,res){
    try {
        const {id, text} = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(
        id,  
        {text:text},  
        { new: true, runValidators: true }  
        )
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        // console.log(updatedBlog);
        res.status(200).json({ message: "Blog updated successfully", updatedBlog });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
    
}

async function handleAllBlogsGet(req,res){
    const blogs = await Blog.find({});
    res.json({blogs:blogs});
}

async function handleDeleteBlog(req,res){
    const {id} = req.body;
    const blog = await Blog.findOne({_id:id});
    if(blog.authorEmail == req.session.user.email){
        await Blog.deleteOne({_id:id});
    }
    res.status(200).json({message:"Blog deleted successfully"})
}

async function handleAddCommentPost(req,res){
    const {name, comment, blog_id, createdat, user_id} = req.body;
    const cmt = await Comment.create({
        comment,
        blog_id,
        createdat,
        name,
        user_id
    })
    res.status(200).json({ message: "Comment added successfully",cmt});
}

async function handleGetComments(req,res){
    const {id} = req.query;
    const comments = await Comment.find({blog_id:id});
    res.status(200).json({comments:comments});
}
async function handledeleteCommentPost(req,res){
    const {id} = req.body;
    const comment = await Comment.deleteOne({_id:id});
    // console.log(comment);
    res.status(200).json({message:"Comment Deleted"});
}

async function handleEditGet(req,res){
    console.log(req.query);
    try {
        console.log("hii");
        const { blog_id } = req.query;
        console.log(blog_id);
        const blog = await Blog.findOne({ _id: blog_id });
        if (!blog) {
            return res.status(404).send("Blog not found");
        }
        console.log("blog", blog);
        res.render("edit", {user:req.session.user , blog:blog });  // Pass data to template
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}






module.exports = {
    handleCreateBlogGet, 
    handleCreateBlogPost,
    handleYourBlogsGet,
    handleMyBlogsGet,
    handleUpdateBlogPost,
    handleAllBlogsGet,
    handleAddCommentPost,
    handleGetComments,
    handledeleteCommentPost,
    handleDeleteBlog,
    handleEditGet
}