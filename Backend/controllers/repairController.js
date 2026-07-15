const Repair = require("../models/Repair");


// ดึงรายการทั้งหมด
exports.getRepairs = async (req, res) => {

    try {

        const repairs = await Repair.find({ user: req.user.id })
            .populate("user", "name email")
            .sort({createdAt:-1});


        res.status(200).json(repairs);


    } catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// ดูรายการตาม ID
exports.getRepairById = async (req,res)=>{

    try{

        const repair = await Repair.findById(req.params.id)
            .populate("user","name email");


        if(!repair){

            return res.status(404).json({
                message:"ไม่พบรายการ"
            });

        }


        res.json(repair);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// สร้างแจ้งซ่อม
exports.createRepair = async (req,res)=>{

    try{


        const {
            title,
            detail,
            location
        } = req.body;



        const repair = await Repair.create({

            title,
            detail,
            location,
            user:req.user.id

        });



        console.log("สร้าง Repair สำเร็จ:",repair);



        res.status(201).json({

            message:"แจ้งซ่อมสำเร็จ",

            repair

        });



    }catch(error){

        console.log(error);


        res.status(500).json({

            message:error.message

        });

    }

};



// แก้ไข
exports.updateRepair = async(req,res)=>{

    try{

        const repair = await Repair.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );


        res.json(repair);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// ลบ
exports.deleteRepair = async(req,res)=>{

    try{

        await Repair.findByIdAndDelete(req.params.id);


        res.json({
            message:"ลบสำเร็จ"
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};