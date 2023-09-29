const User = require("../models/User")
const OTP = require("../models/OTP")
const otpgenerator = require("otp-generator")
const bcrypt=require('bcrypt')
const Profile=require("../models/Profile")
const jwt=require('jsonwebtoken')
require('dotenv').config();
const cookie=require('cookie-parser')


const mailSender=require('../util/mailSender')
const { application } = require("express")

//sendOTP

exports.sendOTP = async (req, res) => {
    try {
        //fetching email from body
        const { email } = req.body;

        //checking if user is already present
        const checkUser = await User.findOne({ email })

        if (checkUser) {
            return res.status(401).json({
                success: false,
                message: "User is already registered"
            })
        }
        //generate OTP
        var otp = otpgenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })
        console.log("Otp generated successfully and it is ", otp)

        //check unique otp of not

        const result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpgenerator(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })

            const result = await OTP.findOne({ otp: otp });

        }
       // const otpPayload = { email, otp}

        //create an entry in the db for otp
        const otpBody = await OTP.create({email,otp})
        console.log("otpbody is",otpBody)

        //return res status 
        res.status(200).json({
            success: true,
            message: "Otp sent successfully"
        })
    }
    catch (err) {
        console.log("Error occured ", err)
        return res.status(400).json({
            success: false,
            message: "Error occured while generating the otp"
        })

    }

  

}

//Singup

exports.signup = async (req, res) => {
    try{
    const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = req.body;
    //validating the data
    if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
        return res.status(403).json({
            success: false,
            message: "All fields are required"
        })
    }

    //matching password and confirmPassword
    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "password and confirmPassword value does not match,please try again"
        })
    }

    const existingUSer = await User.findOne({ email })
    if (existingUSer) {
        return res.status(400).json({
            success: false,
            message: "user is already registered"
        })
    }
      //find most recent OTP stored for the user
      
      const recentotp = await OTP.find({ email} ).sort({ createdAt:-1}).limit(1);
      console.log("recent otp is",recentotp.otp)
      console.log("recentotp is",recentotp)
      //validateOTP
      if (recentotp.length == 0) {
          //OTP not found
          return res.status(400).json({
              success: false,
              message: "Otp  found"
          }
          )
      } else if (otp !== recentotp[0].otp) {
          return res.status(400).json({
              success: false,
              message: " OTP is not matching "
          })
      }

      //Hash password

      const hashPassword=await bcrypt.hash(password,10);

   

      const profileDetails=await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null,
      })

    //creating the entry into the DB
      const user=await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashPassword,
        accountType,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`

      })
      console.log(user)
      res.status(200).json({
        success:true,
        message:"user is registered successfully",
        user,
      })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"User cannot be registered please try again"
        })

    }
}

//login
exports.login=async(req,res)=>{
    try{
        //get data from req body
        const{email,password}=req.body;

        //validation data
        if(!email || !password){
            return res.status(200).json({
                success:false,
                message:"All fields are required, please try again"
            })
        }

        //check user exist in database
        const user=await User.findOne({email})
        if(!user){
            res.status(400).json({
                success:false,
                message:"No such user is registered ,Signup first"
             } )
        }

        bcrypt.compare(password,user.password,(err,data)=>{
            if(err){
                console.log(err);
        return res.status(500).json({
            success:false,
            message:"Login failure please try again"
        })
            }
            if(!data){
                return res.status(401).json({
                    success:false,
                    message:"Password is incorrect"
                })

            }
            else{
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            
        
        user.token=token
        user.password=undefined;
       

        const options={
            Expires:new Date(Date.now()+3*24*60*60*1000),
            HttpOnly:true,

        }
    


        //create cookie and send as response
      
       res.cookie("token",token,options).status(200).json({
            success:true,
            options,
            token,
            password,
            message:"Token is created and send as cookie"
        })
    }
   

        
    })
}catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Login failure please try again"
        })

    }
}

//changePassword

exports.changePassword=async(req,res)=>{
    try{
        const {email,oldPassword,newPassword,confirmPassword}=req.body;
        if(!oldPassword || !newPassword || !confirmPassword){
            res.status(500).json({
                success:false,
                message:"Fill all the required details"
            })
        }

        if(newPassword!==confirmPassword){
            res.status(500).json({
                success:false,
                message:"newPassword and confirmpassword does not match"
            })

        }
        const user=await User.findOne({email})
     

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "No such user find for changing the password"
            })
        }
        const newhashPass=await bcrypt.hash(newPassword,10);
        if(bcrypt.compare(user.password,oldPassword)){

            var pass=await User.findOneAndUpdate({email:email},{$set:{password:newhashPass}},{new:true},(doc,err)=>{
                    if(err){
                        console.log("Error occured while updating the data")
                    }else{
                        console.log("Updated Successfully")
                    }
            })
            
            pass.password=undefined;
            console.log("output after updating the pass",pass);
            mailSender(email,`password updated and the new pass is in has ${newhashPass}`,newPassword)
        
            return res.status(200).json({
                success:true,
                message:"Password is updated into the database"
                 })
            
    

        }
        else{
            return res.status(400).json({
                success:false,
                message:"Old password does not match"
            })
        }
          


        
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error occured while changing the pass"
        })


    }
}

