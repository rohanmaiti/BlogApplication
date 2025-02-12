const express = require("express");
const router = express.Router();

const {userAuth, ifNotLogin} = require("../middlewire/authentication.js");
const {handleSignupPost, handleLoginPost , handleLoginGet, handleSignupGet ,handleLogoutPost} = require("../controllers/user.controller.js");

router.post("/signup",handleSignupPost);
router.get("/signup",ifNotLogin,handleSignupGet)
router.post("/login",handleLoginPost);
router.get("/login",ifNotLogin,handleLoginGet)

router.post("/logout",userAuth, handleLogoutPost);

module.exports = router;