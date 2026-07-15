const express = require("express");

const router = express.Router();

const {
    getRepairs,
    getRepairById,
    createRepair,
    updateRepair,
    deleteRepair
} = require("../controllers/repairController");

const authMiddleware = require("../middleware/authMiddleware");


// GET ทั้งหมด (เฉพาะของ user ที่ login อยู่)
router.get("/", authMiddleware, getRepairs);


// GET ตาม ID
router.get("/:id", getRepairById);


// POST แจ้งซ่อม
router.post("/", authMiddleware, createRepair);


// PUT แก้ไข
router.put("/:id", updateRepair);


// DELETE
router.delete("/:id", deleteRepair);


module.exports = router;