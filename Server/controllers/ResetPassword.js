const User=require('../models/User')
const bcrypt=require('bcrypt')
const crypto=require('crypto')


const mailSender=require('../util/mailSender')

exports.resetPasswordToken=async(req,res)=>{
    try{
        //get Email from req body
        const {email}=req.body;

        //check user for this email, email validation
        const user= await User.findOne({email})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Your Email is not registered"
            })
        }

        //generate token
        const token =crypto.randomUUID();
        //update user by adding token and expiration time
        const updateDetails=await User.findOneAndUpdate({email:email},{token:token,resetPasswordExpires:Date.now()+5*60*1000},{new:true})

        //creating the url
        const url=`http://localhost:3000/update-password/${token}`;
        
        //sending the mail containing the url with token
        await mailSender(email,"Password Reset Link",`Password Reset Link: ${url}`)

        //sending response

        return res.status(200).json({
            success:true,
            message:"Email sent successfully, Please check you Email and change password"
        })
    }catch(err){
        console.log(err)

        return res.status(500).json({
            success:false,
            message:"Something went wrong while reseting the password"
        })

    }
}

exports.resetPassword=async(req,res)=>{
    try{
       //fetching data
       const {password,confirmPassword,token}=req.body;//here token is send in req.body by the frontend

       //validation
       if(password!==confirmPassword){
        return res.json({
            success:false,
            message:"Password not matching"
        })
       }

       //getting user details from DB using token
       const userDetails=await User.findOne({token})

       //if user is not present
       if(!userDetails){
        return res.json({
            success:false,
            message:"Token invalid "
        })

       }

       //Token expiration time check
       if(userDetails.resetPasswordExpires < Date.now()){
        return res.json({
            success:false,
            message:"Token is expired,Please regenerate your token"
        })
       }

       //hashing the new password
       const hashedPassword=await bcrypt.hash(password,10);

       //password update
       await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true},
       );

       //return response
       return res.status(200).json({
        success:true,
        message:"Password is successfully Reset"
       })



    }catch(err){
        console.log(err);
        return res.status(403).json({
            success:false,
            message:"Error occured while Resseting the Password"
        })
    }
}