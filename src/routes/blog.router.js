const express = require("express");
const router = express.Router();

const {userAuth, ifNotLogin} = require("../middlewire/authentication.js");
const {handleCreateBlogGet, handleCreateBlogPost, handleYourBlogsGet , handleMyBlogsGet , handleUpdateBlogPost , handleAllBlogsGet} = require("../controllers/blog.controller.js");

router.get("/yourBlogs",userAuth,handleYourBlogsGet)
router.get("/createBlog",userAuth,handleCreateBlogGet);
router.post("/createBlog",userAuth,handleCreateBlogPost);
router.get("/myBlogs",userAuth,handleMyBlogsGet)

router.post("/updateBlog",userAuth,handleUpdateBlogPost);
router.get("/allBlogs",userAuth,handleAllBlogsGet);




module.exports =  router;
