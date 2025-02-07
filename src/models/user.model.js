const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    profileImageUrl:{
        type:String,
        default:"./public/default.png"
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }

},
{timestamps:true}
)

const User = mongoose.model("user", userSchema);
module.exports = User;