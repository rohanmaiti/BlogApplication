const express = require("express");
const router = express.Router();

const {userAuth, ifNotLogin} = require("../middlewire/authentication.js");
const {handleCreateBlogGet, handleCreateBlogPost, handleYourBlogsGet , handleMyBlogsGet , handleUpdateBlogPost} = require("../controllers/blog.controller.js");

router.get("/yourBlogs",userAuth,handleYourBlogsGet)
router.get("/createBlog",userAuth,handleCreateBlogGet);
router.post("/createBlog",userAuth,handleCreateBlogPost);
router.get("/myBlogs",userAuth,handleMyBlogsGet)

router.post("/updateBlog",userAuth,handleUpdateBlogPost);




module.exports =  router;
