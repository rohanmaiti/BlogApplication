const express = require("express");
const router = express.Router();

const {handleSignupPost, handleLoginPost , handleLoginGet, handleSignupGet} = require("../controllers/user.controller.js");

router.post("/signup",handleSignupPost);
router.get("/signup",handleSignupGet)
router.post("/login",handleLoginPost);
router.get("/login",handleLoginGet)

module.exports = router;