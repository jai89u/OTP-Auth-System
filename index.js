const express = require('express');
const authRoutes = require("./routes/authRoutes")
const dbConnect = require("./config/database");
const app = express();

const dotenv = require('dotenv');
// load config
dotenv.config();

// middleware
app.use(express.json());
app.use("/api/v1",authRoutes);

// database connect
dbConnect();

// service start

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`App is ruuning on PORT no ${PORT}`)
})

app.get('/',(req,res)=>{
    res.send("Welcome to Homepage")
})


