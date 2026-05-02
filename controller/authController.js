const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const mailSender = require("../utils/mailSender");
// const e = require('express');

// signup 

exports.signup = async(req,res)=>{
    try{
        
        // fetch data
        const{name,email,password,role} = req.body;
    

        // check  userExisting
        
        const userExisting = await User.findOne({email});
        if(userExisting){
            return res.status(400).json({
                success:false,
                message:"User already Exists",
            });
        }

        // hash password 

        const hashPassword = await bcrypt.hash(password,10);

        // Generate OTP
        const otp = Math.floor(100000+Math.random()*900000);

        // create User
        const user = await User.create({
            name,
            email,
            password:hashPassword,
            role,
            otp
        })

        // send OTP mail

        await mailSender(
            email,
            "OTP Verification",

            `<h1> Your OTP is ${otp} </h1>`,
        )

        // response

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
                message:"User not founf"
            });
        }

        if(user.otp!=otp){
            return res.status(400).json({
                success:false,
                message:"Invalid Otp"
            })
        }

        user.isVerified = true;
        user.otp = null;

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

        // check user
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

        // comapre Password

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid Password"
            })
        }

        console.log("Entered Password:", password);
        console.log("DB Password:", user.password);

        // const payload

        const payload = {
            email:user.email,
            id:user.id,
            role:user.role,
        }

        // Jwt token

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

