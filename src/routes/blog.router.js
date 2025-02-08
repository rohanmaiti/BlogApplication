const express = require("express");
const router = express.Router();

const {userAuth, ifNotLogin} = require("../middlewire/authentication.js");
const {
    handleCreateBlogGet,
    handleCreateBlogPost,
    handleYourBlogsGet,
    handleMyBlogsGet,
    handleUpdateBlogPost,
    handleAllBlogsGet,
    handleAddCommentPost
     } = require("../controllers/blog.controller.js");

router.get("/yourBlogs",userAuth,handleYourBlogsGet)
router.get("/createBlog",userAuth,handleCreateBlogGet);
router.get("/myBlogs",userAuth,handleMyBlogsGet)
router.get("/allBlogs",userAuth,handleAllBlogsGet);

router.post("/createBlog",userAuth,handleCreateBlogPost);
router.post("/updateBlog",userAuth,handleUpdateBlogPost);
router.post("/addComment",userAuth,handleAddCommentPost);


module.exports =  router;
