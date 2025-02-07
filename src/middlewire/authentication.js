function userAuth(req,res,next){
    if(req.session && req.session.user){
        next();
    }
    else{
        res.redirect("/user/login")
    }
}

function ifNotLogin(req,res,next){
if(req.session && req.session.user){
    res.redirect("/home");
}
else{
    next();
}
}
module.exports = {userAuth, ifNotLogin};