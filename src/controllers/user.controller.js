const bcrypt = require('bcryptjs');
const User = require("../models/user.model");
async function handleSignupPost(req,res){
    try {
        // use bycryptjs
        const {name, email, password} = req.body;
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt)
        // const user = new User({name:name , email: email, password:hash})
        // await user.save();
        const user = await User.create({
            name:name,
            email:email,
            password:hash
        })
        req.session.user = user;
        res.redirect("/home");
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Error in Signup"});
    }
   
}
 async function handleLoginPost(req,res){
    const {email, password} = req.body;
    const user = await User.findOne({email:email})
    if(!user){
        // res.send(`<script>alert("You do not  have an account"); window.location.href="/user/login"</script>`);
        // return;
        return res.status(500).json({message:"User does not exists"})
    }
    const isMatch = await bcrypt.compareSync(password,user.password);
    if(isMatch){
        req.session.user = user;
        res.redirect("/home");
    }
    else{
        return res.status(500).json({message:"Wrong password"})
        // res.send(`<script>alert("Wrong Password"); window.location.href="/user/login"</script>`);
    }
}
async function handleLogoutPost(req,res){
    console.log("logout function")
    req.session.destroy()
    res.redirect("/user/login");
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
    handleSignupGet,
    handleLogoutPost
}