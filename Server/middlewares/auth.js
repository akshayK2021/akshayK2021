const jwt=require('jsonwebtoken')
require('dotenv').config();
const User=require('../models/User')

exports.auth=async(req,res,next)=>{
    try{
        //extract token
        const token= req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer","")

        //if token missing then return the response
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            })
        }

        //verifying the token
        try{
            const decode= jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode
        }catch(err){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
        }
        next();

    }catch(err){
        res.status(401).json({
            success:false,
            message:"Something went wrong while valadating the token"
        })

    }
}

//isStudent verification

exports.isStudent=async(req,res,next)=>{
    try{

        if(req.user.accountType !=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected router for students only"
            })
        }
        next();
        
        
        
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
        })

    }
}

exports.isAdmin=async(req,res,next)=>{
    try{

        if(req.user.accountType !=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected router for Admin only"
            })
        }
        next();
        
        
        
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
        })

    }
}

exports.isInsructor=async(req,res,next)=>{
    try{

        if(req.user.accountType !=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected router for Instructor only"
            })
        }
        next();
        
        
        
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
        })

    }
}