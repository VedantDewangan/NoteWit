const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    }
})

const NoteSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    noteTitle:{
        type:String
    },
    noteContent:{
        type:String
    },
    noteCreated:{
        type:String
    }
})

const TaskSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Task:{
        type:String,
        required:true 
    },
    DeadTime:{
        type:String 
    },
    Done:{
        type:Boolean,
        default:false
    },
    TaskCreated:{
        type:String
    }
})

const User = new mongoose.model("user",UserSchema);
const Note = new mongoose.model("note",NoteSchema);
const Task = new mongoose.model("task",TaskSchema);

module.exports = {User,Note,Task};