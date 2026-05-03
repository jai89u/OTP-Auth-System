const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const mailSender = require("../utils/mailSender");

// signup 

exports.signup = async(req,res)=>{
    try{
        
        const{name,email,password,role} = req.body;
    
        const userExisting = await User.findOne({email});
        if(userExisting){
            return res.status(400).json({
                success:false,
                message:"User already Exists",
            });
        }

        const hashPassword = await bcrypt.hash(password,10);

        // Generate OTP
        const otp = Math.floor(100000+Math.random()*900000);

        // create User (added otpExpires)
        const user = await User.create({
            name,
            email,
            password:hashPassword,
            role,
            otp,
            otpExpires: Date.now() + 5 * 60 * 1000 // 5 min expiry
        })

        // send OTP mail (updated HTML)
        await mailSender(
            email,
            "OTP Verification",

            `
            <div style="font-family: Arial; padding:20px;">
                <h2>OTP Verification</h2>
                <p>Hello ${name || "User"},</p>
                <p>Your OTP is:</p>
                <h1 style="color:green; letter-spacing:5px;">${otp}</h1>
                <p>This OTP is valid for 5 minutes.</p>
                <p style="color:red; font-weight:bold;">
                  ⚠️ Do not share your OTP with anyone.
                </p>
            </div>
            `,
        )

        return res.status(200).json({
            success:true,
            message:"Signup Successfull, OTP sent",
            user,
        });

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Signup failed"
        })
    }
}


exports.verifyOtp = async(req,res)=>{

    try{

        const{email,otp} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }

        if(user.otp != otp){
            return res.status(400).json({
                success:false,
                message:"Invalid Otp"
            })
        }

        // check otp expiry
        if(user.otpExpires < Date.now()){
            return res.status(400).json({
                success:false,
                message:"OTP expired"
            })
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        return res.status(200).json({
            success:true,
            message:"OTP verified Successfully"
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"OTP verification failed",
        })
    }
}


// Login

exports.login = async(req,res)=>{
    try{

        const{email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not Found"
            })
        }

        if(user.isVerified===false){
            return res.status(401).json({
                success:false,
                message:"Please verify your Account"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid Password"
            })
        }

        const payload = {
            email:user.email,
            id:user.id,
            role:user.role,
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h"
        })

        return res.status(200).json({
            success:true,
            message:"Login Successful",
            token
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Login falied"
        })
    }
}