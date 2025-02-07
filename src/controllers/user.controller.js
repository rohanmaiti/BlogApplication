const bcrypt = require('bcryptjs');
const User = require("../models/user.model");
async function handleSignupPost(req,res){
    try {
        // use bycryptjs
        const {name, email, password} = req.body;
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt)
        const user = await User.create({
            name:name,
            email:email,
            password:hash
        })
        res.redirect("/home");
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Error in Signup"});
    }
   
}
 function handleLoginPost(req,res){
    res.send("signup controller")
}

 function handleLoginGet(req,res){
    res.render("login");
}

 function handleSignupGet(req,res){
    res.render("signup");
}

module.exports = {
    handleSignupPost,
    handleLoginPost,
    handleLoginGet,
    handleSignupGet
}