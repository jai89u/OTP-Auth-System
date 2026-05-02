const mongoose = require('mongoose');

const dbConnect = async()=>{
   mongoose.connect(process.env.DATABASE_URL)
   .then(()=>{
    console.log("DataBase Connection Successfull")
   })
   .catch((err)=>{
    console.log("Error While Connecting To Database");
    console.log(err)
   })

}

module.exports = dbConnect;