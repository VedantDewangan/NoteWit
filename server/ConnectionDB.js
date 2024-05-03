const mongoose = require("mongoose");
require("dotenv").config()

const ConnectionDB = async ()=>{
    try {
        await mongoose.connect(process.end.MONGODB_URI,{
              useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connection with DATABASE Successfull");
    } catch (error) {
        console.log("Connection with DATABASE Failed");
    }
}

module.exports = ConnectionDB;


