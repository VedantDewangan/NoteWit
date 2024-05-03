const mongoose = require("mongoose");
require("dotenv").config()

const ConnectionDB = async ()=>{
    try {
        console.log(process.end.MONGODB_URI);
        await mongoose.connect(process.end.MONGODB_URI,{
              useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connection with DATABASE Successfull");
    } catch (error) {
        console.log(error);
    }
}

module.exports = ConnectionDB;


