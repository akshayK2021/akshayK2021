const Course=require('../models/Course')
const Category=require('../models/category')
const User=require('../models/User');
const{uploadImageToCloudinary}=require('../util/imageUploader')

//create Course handler function

exports.createCourse=async(req,res)=>{
    try{
        //fetch data

        const {courseName,courseDescription,whatYouWillLearn,price,category}=req.body;
        
        //get thumbnail
        const thumbnail=req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"All fields are required for creating the course"
            })
        }
        console.log("first")

        //check for instructor to insert his id into the schema of the course

        const userId=req.user.id;
        const instructorDetails=await User.findById(userId);
        console.log("first")
        console.log("Instructor Details",instructorDetails)

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor details not found"
            })
        }

        //Category validation
        const categoryDetails=await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category details not found"
            })
        }
        console.log("I am here",categoryDetails)
        //upload image to cloudinary
        const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME)
        console.log("first")
        //create an entry for new Course
        const newCourse=await Course.create({
            courseName:courseName,courseDescription:courseDescription,instructor:instructorDetails._id,whatYouWillLearn:whatYouWillLearn,price:price,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })
console.log("after uploading",newCourse)
        //add the new course to the user schema of the Instructor
        await User.findByIdAndUpdate({_id:instructorDetails._id},{$push:{courses:newCourse._id}},{new:true})
        console.log("Updating user successfully")

        //updating the Category schema
        await Category.findByIdAndUpdate({_id:category},{$push:{courses:newCourse._id}},{new:true})



        //return response
        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        })

        
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error occured while uploading files to cloudinary",
            error:err .message
        })
    }
}

exports.getAllCourse=async(req,res)=>{
    try{
        const allCourses = await Course.find({},{courseName:true,
                                                 price:true,
                                                 thumbnail:true,
                                                 instructor:true,
                                                 ratingAndReview:true,
                                                 studentsEnrolled:true   }).populate("instructor").exec();
    
        return res.status(200).json({
            success:true,
            message:"Data for all courses fetched successfully",
            data:allCourses,
        })


    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Cannot fetch Course data",
            error:err.message
        })
    }

}


exports.getCourseDetails=async(req,res)=>{
    try{

        //fetching the data from the req body
        const{courseId}=req.body;
        //find course details 
        const courseDetails =await Course.findById(courseId).populate({
            path:"instructor",
            populate:{
                path:"additionalDetails"
            }
        }).populate("category").populate("ratingAndReview").populate({
            path:"courseContent",
                populate:{
                    path:"subSection"
                }
        }).exec()

        //validation

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find the Course with ${courseId}`
            })
        }
        
        //return response
        return res.status(200).json({
            success:true,
            
            message:"Course Details fetched successfully",
            data:courseDetails,
        })


    }catch(err){
        return res.status(400).json({
            err:err.message,
            success:false,
            message:"Error while getting the course detail"
        })
    }
}