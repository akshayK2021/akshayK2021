const express=require("express")
const router=express.Router()
const {auth}=require("../middlewares/auth")
const{deleteAccount,
updateDisplayPicture,
updateProfile,getAllUserDetails,getEnrolledCourses}=require("../controllers/Profile")

//Delete User Account
router.delete("/deleteProfile",auth,deleteAccount);
router.put("/updateProfile",auth,updateProfile);
router.get("/getUserDetails",auth,getAllUserDetails);

//Get Enrolled Courses
router.get("/getEnrolledCourses",auth,getEnrolledCourses)
router.post("/updateDisplayPicture",auth,updateDisplayPicture)

module.exports=router

