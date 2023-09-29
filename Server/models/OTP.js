const mongoose=require('mongoose')
const mailSender = require('../util/mailSender')
const {otpTemplate}=require("../mail/template/emailVerification")

const OTPSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 5*60
    }
})

async function sendVerificationEmail(email,otp){
    try{
        const emailbody=otpTemplate(otp)
        console.log("at the firstt step",emailbody)
        const mailResponse=await mailSender(email,"Verification email from StudyNotion",emailbody)
        console.log("Email sent succesfully and response is ",mailResponse)

    }catch(err){
        console.log("Error occured while sending the mail"+err)

    }

}

//seding the mail before saving in database using pre middleware
OTPSchema.pre("save",async function(next){
await sendVerificationEmail(this.email,this.otp)
next();
})

module.exports=mongoose.model("OTP",OTPSchema)