const Profile=require('../models/Profile')
const User=require('../models/User')
const {uploadImageToCloudinary}=require("../util/imageUploader");

exports.updateProfile=async(req,res)=>{
    try{

        //fetching the data
        const{dateOfBirth="",about="",contactNumber,gender}=req.body;

        //get userId
        const id=req.user.id;

        //validation
        if(!contactNumber || !gender || !id){
            return res.json({
                success:false,
                message:"All the files are required"
            })
        }

        //fetcing User details
        const userDetails=await User.findById(id)
        const ProfileId=userDetails.additionalDetails;
        const profileDetails=await Profile.findById(ProfileId)

        //update Profile
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.gender=gender;
        profileDetails.contactNumber=contactNumber
        await profileDetails.save() //another way to save data into the database when the object is already created

        //sending the response
        return res.status(200).json({
            success:true,
            message:"Profile is created Successfully",
            profileDetails
        })

    }catch(err){
        return res.status(402).json({
            success:false,
            message
        })
    }
}

exports.deleteAccount=async(req,res)=>{
    try{
        console.log("It is here")
        const id=req.user.id
        console.log("It is here")
        //validation 
        console.log(id);
        const userDetails=await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        //delete profile 
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails})
            //H.W-->unrolled user from all enrolled courses

        //delete User
        await User.findByIdAndDelete({_id:id})
    

        //return response
        return res.status(202).json({
            success:true,
            message:"User deleted successfully"

        })

    }catch(err){
        return res.status(404).json({
            success:false,
            message:"User account cannot be deleted "

        })
    }
}

exports.getAllUserDetails=async(req,res)=>{
    try{
        //get id
        const id=req.user.id
        
        //validation and get use details
        const userDetails=await User.findById(id).populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"User data fetched successfully"
        })

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message

        })
    }
}

exports.updateDisplayPicture=async(req,res)=>{
    try{
        const id=req.user.id
        
        const image=req.files.file;
        
        
    const response=await    uploadImageToCloudinary(image,"StudyNotion");
    console.log(response.secure_url);
        const user=await User.findByIdAndUpdate(id,{image:response.secure_url})
    
     
        return res.status(200).json({
            success:true,
            message:"Your profile Picture updated successfully"
        })
 

    }catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"error occured while updateing your display picture"
        })

    }
    
}

exports.getEnrolledCourses=async(req,res)=>{
    try{
        const id=req.user.id;
        const user=await User.findOne({_id:id}).populate("courses").exec()
        return res.status(200).json({
            success:true,
            message:"All the courses enrolled by the student are fetched"
        })
        
    }catch(err){
        console.log(err)
        return res.status(404).json({
            success:false,
            message:"Error occured while fetching all the courses of the user"
        })

    }
}