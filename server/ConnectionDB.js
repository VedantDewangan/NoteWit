const mongoose = require("mongoose");
require("dotenv").config()

const ConnectionDB = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://vedantdewangan75:0BEIuNAENR2SpSLj@cluster0.n4mjox1.mongodb.net/vedantdewangan75?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connection with DATABASE Successfull");
    } catch (error) {
        console.log("Connection with DATABASE Failed");
    }
}

module.exports = ConnectionDB;


