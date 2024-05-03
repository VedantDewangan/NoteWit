const express = require("express");
const router = require('./Routes');
const ConnectionDB = require("./ConnectionDB");
require('dotenv').config();
const cors = require("cors");
const cookieParser = require('cookie-parser')

const PORT = 3000 || process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json())
app.use(cookieParser())

app.use('/api',router);

ConnectionDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is working at port ${PORT}`);
    })
})
