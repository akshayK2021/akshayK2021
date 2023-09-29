const Category=require("../models/category")
const Section=require("../models/Section")
const Course=require("../models/Course")

exports.createSection=async(req,res)=>{
    try{
        //fetching data from the body
        const{sectionName,courseId}=req.body;
        
        //validation of the data fetched
        if(!sectionName || !courseId){
            return res.status(401).json({
                success:false,
                message:"Please provide all the information"
            })
        }

        //create section
        const newSection=await Section.create({sectionName})

        //update the section into the course
        const updatedCourseDetails=await Course.findOneAndUpdate({_id:courseId},{$push:{courseContent:newSection._id}},{new:true})

        //return response 
        return res.status(200).json({
            success:true,
            message:"Section created Successfuly",
            updatedCourseDetails
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Unable to create Section, please try again",
            error:err.message
        })
    }
}


exports.updateSection=async(req,res)=>{
    try{
        //data fetching
        const {sectionName,sectionId}=req.body

          //validation of the data fetched
          if(!sectionName || !sectionId){
            return res.status(401).json({
                success:false,
                message:"Please provide all the information while updating the section"
            })
        }

        //updating the section data;
        const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true})

        //return res
        return res.status(200).json({
            success:true,
            message:"Section updated successfully"
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Unable to update Section, please try again",
            error:err.message
        })

    }
}


exports.deleteSection=async(req,res)=>{
    try{
        const {sectionId}=req.body;

        //deletint the section by finding by its id
        await Section.findByIdAndDelete(sectionId)
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully"
        })

        //return response


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section, please try again",
            error:err.message
        })

    }
}