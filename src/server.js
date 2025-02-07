const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const app = express();
const port = 4000; // change here
app.listen(port,(err)=>{
    err ? console.log(err.message) : console.log(`server started at ${port}`);
})

const userRoutes = require("./routes/user.router");

app.use(express.json());
app.use(express.urlencoded());
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));
app.get("/",(req,res)=>{
    res.render("home");
})

app.use("/user",userRoutes);
app.get("/home",(req,res)=>{
    res.render(home);
})

// const password = "mySecurePassword";
// const saltRounds = 10;

// bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
//   if (err) throw err;
//   console.log("Hashed Password:", hashedPassword);
// });

