const Category = require("../models/Category");
const Tag = require("../models/Category");

//create Tag ka handler funciton

exports.createCategory = async (req,res) =>{
    try{
        // fetch data
        const {name, description} = req.body;
        // validation

        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
        }
        //create entry in DB

        const tagDetails = await Tag.create({
            name:name,
            description:description,
        });

        console.log(tagDetails);
        //return response

        return res.status(200).json({
            success:true,
            message:"Tag Created Successfully",
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//getAlltags handler function
exports.showAllCategories = async (req, res) =>{
    try{
        const allTags = await Tag.find({}, {name:true, description:true}); 
        res.status(200).json({
            success:true,
            message:"All tags returned successfully",
            allTags,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//categoryPageDetails 

exports.categoryPageDetails = async (req,res) =>{
    try{    
        // get categoryId
        const {categoryId} = req.body;
        //get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId)
                                        .populate("course")
                                        .exec();

        //validation
          if(!selectedCategory) {
            return res.status(404).json({
                success:false,
                message:'Data Not Found',
            });
        }

        //get coursesfor different categories

        const differentCategories = await Category.find({
                                    _id: {$ne: categoryId},
                                    })
                                    .populate("courses")
                                    .exec();
        //return response
         return res.status(200).json({
            success:true,
            data: {
                selectedCategory,
                differentCategories,
            },
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}