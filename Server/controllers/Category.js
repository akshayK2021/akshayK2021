const Category=require('../models/category')


exports.createCategory=async(req,res)=>{
    try{
        //fetch data
        const {name,description}=req.body;
        //validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        
        //create entry in DB
        const CategoryDetails=await Category.create({
            name:name,description:description
        });
        console.log(CategoryDetails);
        //return response

        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        })

    }catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:"Error occured while creating the Category"
        })
    }
}

//get All Categorys

exports.showAllCategorys=async(req,res)=>{
    try{
        const allCategorys=await Category.find({},{name:true,description:true})
        res.status(200).json({
            success:true,
            message:"All Categorys returned successfully",
            allCategorys,
        })

    }catch(err){
   
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

//categoryPageDetails
exports.categoryPageDetails=async(req,res)=>{
    try{
        //get categoryId
        const {categoryId}=req.body;
        //get Courses for specified categoryId
        const selectedCategory=await Category.findById(categoryId).populate("courses").exec()
        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data not find"
            })
        }
        //getCourses for different categories
        const differentCategories=await Category.find({_id:{$ne:categoryId}}).populate("courses").exec();


        //get topselling courses
        //H.W

        //return response 
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
            },
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:true,
            message:err.message
        })

    }
}