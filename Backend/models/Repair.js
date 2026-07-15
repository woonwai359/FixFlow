const mongoose = require("mongoose");


const repairSchema = new mongoose.Schema(
{

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    title:{
        type:String,
        required:true
    },


    detail:{
        type:String,
        required:true
    },


    location:{
        type:String,
        required:true
    },


    status:{
        type:String,
        enum:[
            "รอดำเนินการ",
            "กำลังดำเนินการ",
            "เสร็จสิ้น"
        ],
        default:"รอดำเนินการ"
    }


},
{
    timestamps:true
});


const Repair = mongoose.model(
    "Repair",
    repairSchema
);


module.exports = Repair;