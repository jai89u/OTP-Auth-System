const express = require('express');
const router = express.Router();

const{signup,verifyOtp,login} = require("../controller/authController");
const{auth,isStudent,isAdmin} = require("../middleware/auth");

// Auth Routes

router.post("/signup",signup);
router.post("/verifyOtp",verifyOtp);
router.post("/login",login);

// Students Route

router.get('/student',auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome Studnet"
    })
})

// Admin Route

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome Admin"
    })
})

module.exports = router;
