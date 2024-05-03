const mongoose = require("mongoose");
require("dotenv").config()

const ConnectionDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connection with DATABASE Successfull");
    } catch (error) {
        console.log("Connection with DATABASE Failed");
    }
}

module.exports = ConnectionDB;


