const mongoose=require('mongoose')
require('dotenv').config();

exports.Connect=async()=>{
    try{
        mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })

        console.log("Database is successfully connected")
        
    }catch(err){
        console.log("Error occured while connecting to the database and the error is "+err)
    }

}