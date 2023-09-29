const express=require("express")
const router=express.Router()

const{ createCourse, getAllCourse, getCourseDetails }=require("../controllers/Course")

const{ createCategory, showAllCategorys, categoryPageDetails }=require("../controllers/Category")

const{ createSection, updateSection, deleteSection }=require("../controllers/Section")

const{ updateSubSection, deleteSubSection, createSubSection }=require("../controllers/SubSection")

const{ createRating, getAverageRating, getAllRating }=require("../controllers/RatingAndReview")

const{ auth, isInsructor, isStudent, isAdmin }=require("../middlewares/auth")


//Courses can only be created by the Instructors
router.post("/createCourse",auth,isInsructor,createCourse);
//Add a Section to a course
router.post("/addSection",auth,isInsructor,createSection);
//Update a Section
router.post("/updateSection",auth,isInsructor,updateSection)
//Delete a Section
router.post("/deleteSection",auth,isInsructor,deleteSection)
//Edit Sub Section
router.post("/updateSubSection",auth,isInsructor,updateSubSection)
//Delete Sub section
router.post("/deleteSubSection",auth,isInsructor,deleteSubSection)
//Add a subsection to a section
router.post("/addSubSection",auth,isInsructor,createSubSection)
//Get all Registered Courses
router.get("/getAllCourses",getAllCourse)
//get Details for the Specific Course
router.get("/getCourseDetails",getCourseDetails)

router.post("/createCategory",auth,isAdmin,createCategory)
router.post("/showAllCategories",showAllCategorys)
router.post("/getCategoryPageDetails",categoryPageDetails)


//Rating and Review
router.get("/createRating",auth,isStudent,createRating)
router.get("/getAverageRating",getAverageRating)
router.get("/getReviews",getAllRating)

module.exports=router