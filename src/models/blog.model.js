const mongoose = require("mongoose");
const User = require("./user.model");
const blogSchema = new mongoose.Schema({
    text:{
        type:String,
        require: true,
    },
    title:{
        type:String,
        require : true
    },
    authorEmail:{
        type:String,
        ref:User
    },
    authorName:{
        type:String,
        ref:User
    },
    comments:{
        type:[{}],
        require:false,
    }
},
{timestamps:true}
)

const Bolgs = mongoose.model("blogs",blogSchema);
module.exports = Bolgs;