const express = require("express");
const router = express.Router();

const {userAuth, ifNotLogin} = require("../middlewire/authentication.js");
const {handleSignupPost, handleLoginPost , handleLoginGet, handleSignupGet} = require("../controllers/user.controller.js");

router.post("/signup",handleSignupPost);
router.get("/signup",ifNotLogin,handleSignupGet)
router.post("/login",handleLoginPost);
router.get("/login",ifNotLogin,handleLoginGet)

module.exports = router;