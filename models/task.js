const mongoose = require('mongoose');

const userTask = new mongoose.Schema({
    title:String,
    description:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        select:false,
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    
    iscompleted:{
        type:Boolean,
        default: false,
    }
})

const task = mongoose.model("task" , userTask);
module.exports = task;
