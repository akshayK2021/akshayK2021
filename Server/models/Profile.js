const mongoose=require('mongoose')

const ProfielSchema=new mongoose.Schema({
    gender:{
        type:String
    },
    dateOfBirth:{
        type:String
    },
    about:{
        type:String,
        trim:true
    },
    contactNumber:{
        type:Number,
        trim:false
    }
})

module.exports=mongoose.model("Profile",ProfielSchema)