const express=require("express")
const router=express.Router()

const{login,signup,sendOTP,changePassword}=require("../controllers/Auth")
const{resetPassword,resetPasswordToken}=require("../controllers/ResetPassword")
const {auth}=require("../middlewares/auth")


//Route for User login
router.post("/login",login)
//Route for the Signup
router.post("/signup",signup)

//Route for sending the Otp
router.post("/sendotp",sendOTP)

//Route for changing the Password
router.post("/changepassword",auth,changePassword)

//**********************************************************************************************/
//                                Reset Password                                               //
//**********************************************************************************************/

//Route for generating a reset Password token
router.post("/reset-password-token",resetPasswordToken)

//Route for resetting user's password after verification
router.post("/reset-password",resetPassword)

//Export the router for use in the main application
module.exports=router