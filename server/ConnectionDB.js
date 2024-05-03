const mongoose = require("mongoose");
require("dotenv").config()

const ConnectionDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
              useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connection with DATABASE Successfull");
    } catch (error) {
        console.log(error);
    }
}

module.exports = ConnectionDB;


