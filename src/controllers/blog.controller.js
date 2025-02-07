const Blog = require("../models/blog.model");

function handleCreateBlogGet(req,res){
    res.render("createBlog",{user : req.session.user});
}

async function handleCreateBlogPost(req,res){
    try {
        console.log(req.body);
        console.log( req.session.user.email);
       
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
        console.log(updatedBlog);
        res.status(200).json({ message: "Blog updated successfully", updatedBlog });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
    
}

module.exports = {
    handleCreateBlogGet, 
    handleCreateBlogPost,
    handleYourBlogsGet,
    handleMyBlogsGet,
    handleUpdateBlogPost
}