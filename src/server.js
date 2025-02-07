const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const port = 3000; // change here
app.listen(port,(err)=>{
    err ? console.log(err.message) : console.log(`server started at ${port}`);
})
const uri = "mongodb+srv://rohan:rohan123@cluster0.qzw60o2.mongodb.net/blogDB?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(uri).then(()=>{
console.log("connected to DB");
})
.catch(err=>{
    console.log("Error connecting DB")
})
const userRoutes = require("./routes/user.router");

app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    secret: "secret",
    resave: false,               // Prevents resaving unmodified sessions
    saveUninitialized: false,      
}))

const {userAuth, ifNotLogin} = require("./middlewire/authentication.js");

app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));
app.get("/",userAuth,(req,res)=>{
    res.render("home",{user : req.session.user});
})

app.use("/user",userRoutes);
app.get("/home",userAuth,(req,res)=>{
    res.render("home",{user:req.session.user});
})


