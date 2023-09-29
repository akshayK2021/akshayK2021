const {instance}=require("../config/razorpay")
const Course=require("../models/Course")
const mongoose=require('mongoose')
const User=require("../models/User")
const mailSender=require("../util/mailSender");
const {courseEnrollmentEmail}=require('../mail/template/courseEnrollmentEmail')

//capture the payment and initiate the Razorpay order
exports.capturePayment=async(req,res)=>{
    //get courseId and userId
    const{course_id}=req.body;
    const userId=req.user.id;

    //validation
    if(!course_id){
        return res.status(400).json({
            success:false,
            message:"Please provide valid course Id"
        })

    }

    //valid CourseDetails
    let course;
    try{
        course=await Course.findById(course_id)
        if(!course){
            return res.status(400).json({
                success:false,
                message:"Could bit find the course"
            })
        }

        //user already pay for the same course
        const uid=new mongoose.Types.ObjectId(userId)
        //converting the userID which is in strign form because in Course schema userId is present in form objectId
        if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:"Student is already enrolled into this course"
            })
        }


    }catch(err){
        console.error(err)
        return res.status(500).json({
            success:false,
            message:error.message

        })

    }
    const amount=course.price;
    const currency="INR"
    //return response

    const options={
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId,
        }
    }

    //creating the order
    try{
        //initiating the payment using the razorpay
        const paymentResponse=await instance.orders.create(options)
        console.log(paymentResponse)
        //return response
        res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Could not initiate order"
        })
    }
};

//Verifying the Singnature of Razorpay and Server

exports.verifySignature=async(req,res)=>{
    
        const webhookSecret="12345678"

        //Razorpay signature send in headers by their default behaviour
        const signature=req.headers("x-razorpay-signature")

       const shasum= crypto.createHmac("sha256",webhookSecret)
        shasum.update(JSON.stringify(req.body))
        const digest=shasum.digest("hex")
        if(signature===digest){
            console.log("Payment is Authorized")
        
        //fetching the data stored within notes of creating payment
        const{courseId,userId}=req.body.payload.payment.entity.notes;

        try{

            //fulfill the action

            //find the course and enroll the student in it 
            const enrolledCourse=await Course.findByIdAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true})
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course not found"
                })
            }
            console.log(enrolledCourse)

            //find the User and add the course to their list enrolled courses
            const enrolledStudent=await User.findByIdAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true})
            console.log(enrolledStudent)


            //Sending confirmation mail
            const emailResponse=await mailSender(enrolledStudent.email,"Congratulation you are onboarded into new Course","Congratulations, you are onboarded into new codeHelp course")
            console.log(emailResponse)
            return res.status(200).json({
                success:true,
                message:"Signature Verified and Course Added"
            })

        }catch(err){
            return res.status(500).json({
                success:false,
                message:err.message,
            })

        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:'Invalid request'
        });
    }

}