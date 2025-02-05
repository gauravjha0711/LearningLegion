const mongoose = require("mongoose");
require("dotenv").config();

const CourseProgress= new mongoose.Schema({
    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course", 
    },
    completedVideos: [
        {
            types:mongoose.Schema.Types.ObjectId,
            ref: "SubSection"
        }
    ]

});
module.exports = mongoose.model("CourseProgress",CourseProgress);