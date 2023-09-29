const SubSection=require('../models/SubSection')
const Section=require('../models/Section');
const { uploadImageToCloudinary } = require('../util/imageUploader');
require('dotenv').config()

exports.createSubSection=async(req,res)=>{
    try{
        //fetching data from the req body
        const{sectionId,title,timeDuration,description}=req.body;

        //extracting files/videos from the req
        const video=req.files.video;

        //validation
        if(!sectionId || !title || !timeDuration || !video || !description){
            return res.status(400).json({
                success:false,
                message:"All the files are required"
            })
        }

        //uploading the file to cloudinary
        const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        console.log("sub");

        //create as SubSection
        const SubSectionDetails= await SubSection.create({title:title,timeDuration:timeDuration,description:description,videoUrl:uploadDetails.secure_url})
        console.log("sub");
        //pushing the subsection id into the section schema
        const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},{$push:{subSection:SubSectionDetails._id}},{new:true})//try to use populate
         console.log("sub");
        //return response
        return res.status(200).json({
            success:true,
            message:"Sub section created successfully",
           
        })



    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error occured while creatinng the Subsection",
            error:err.message
        })
    }
}


exports.updateSubSection=async(req,res)=>{
    try{
        const{subSectionId,title,timeDuration,description}=req.body;

      

        const video=req.files.videoFile;
        if(video){
            const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        }
        const subsection= await SubSection.findOneAndUpdate({_id:subSectionId},{$setOnInsert:{title:title,timeDuration:timeDuration,description:description,videoUrl:uploadDetails.secure_url}})

        return res.status(200).json({
            success:true,
            message:"Subsection updated successfully"
        })
        


    }catch(err){
        return res.status(400).json({
            success:false,
            message:"error whiel updating subsection"
        })

    }
}

exports.deleteSubSection=async(req,res)=>{
    try{
        const {subSectionId}=req.params;

        //deletint the section by finding by its id
        await SubSection.findByIdAndDelete(subSectionId)
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully"
        })

        //return response


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Unable to delete subSection, please try again",
            error:err.message
        })

    }
}